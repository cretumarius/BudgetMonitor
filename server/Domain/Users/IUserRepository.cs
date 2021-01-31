using System;
namespace Domain.Users
{
    public interface IUserRepository
    {
        User AddUser(User user);

        User GetUserById(Guid id);

        User GetUserByEmail(string email);
    }
}
