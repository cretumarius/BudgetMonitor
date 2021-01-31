using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Business.Base;
using Business.BusinessContract;
using Business.BusinessModels.Request;
using Business.BusinessModels.Response;
using Domain.Base;
using Domain.Base.EntityBase;
using Domain.Users;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;

namespace Business
{
    public class UserService : ServiceBase, IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;

        public UserService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IUserRepository userRepository,
            IOptions<AppSettings> appSettings) : base(unitOfWork, mapper)
        {
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
        }

        public User AddUser(RegisterRequest model)
        {
            var passwordHash = BC.HashPassword(model.Password);
            var user = User.CreateUser(model.Email, model.FirstName, model.LastName, passwordHash);
            var addedUser = _userRepository.AddUser(user);
            UnitOfWork.Commit();

            return addedUser;
        }

        public bool UserWasSuccessfullyAdded(Guid id)
        {
            return _userRepository.GetUserById(id) != null;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _userRepository.GetUserByEmail(model.Email);

            if (user == null || !BC.Verify(model.Password, user.PasswordHash))
            {
                // authentication failed
                return null;
            }

            var response = Mapper.Map<AuthenticateResponse>(user);
            response.Token = generateJwtToken(user);
            return response;
        }

        public User GetById(Guid id)
        {
            return _userRepository.GetUserById(id);
        }

        // helper methods

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
