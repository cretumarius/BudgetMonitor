using System;
using DataAccess.Base.Context;
using Domain.Users;

namespace DataAccess.Repository
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(IDataContext dataContext) : base(dataContext)
        {
        }

        public User AddUser(User user)
        {
            return Add(user);
        }

        public User GetUserById(Guid id)
        {
            return GetById(id);
        }

        public User GetUserByEmail(string email)
        {
            return GetByFilterWithChildren(u => u.Email == email);
        }
    }
}
