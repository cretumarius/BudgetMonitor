using Business.BusinessModels.Dtos;
using FluentValidation;

namespace Business.BusinessModels.Request.Validation
{
    public class UserValidator : AbstractValidator<UserDto>
    {
        public UserValidator()
        {
            RuleFor(x => x.EmailAddress).NotEmpty();
        }
    }
}
