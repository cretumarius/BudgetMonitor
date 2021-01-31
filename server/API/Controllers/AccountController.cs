using System;
using Business.BusinessContract;
using Business.BusinessModels.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id, RegisterRequest model)
        {
            if (!_userService.UserWasSuccessfullyAdded(id))
            {
                return NotFound();
            }
            return Ok(model);
        }

        [HttpPost("register")]
        [ProducesResponseType(201)]
        [ProducesResponseType(404)]
        public IActionResult Register([FromBody] RegisterRequest model)
        {   
            var addedAccount = _userService.AddUser(model);

            return CreatedAtAction(nameof(GetById), new { id = addedAccount.Id }, model);
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return Unauthorized(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        //[Authorize]
        //[HttpGet]
        //public IActionResult GetAll()
        //{
        //    var users = _userService.GetAll();
        //    return Ok(users);
        //}
    }
}