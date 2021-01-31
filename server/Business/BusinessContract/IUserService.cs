using System;
using Business.BusinessModels.Request;
using Business.BusinessModels.Response;
using Domain.Users;

namespace Business.BusinessContract
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);

        User GetById(Guid id);

        User AddUser(RegisterRequest userDto);

        bool UserWasSuccessfullyAdded(Guid id);
    }
}
