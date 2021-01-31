using AutoMapper;
using Domain.Users;
using Business.BusinessModels.Response;
using Business.BusinessModels.Request;

namespace Infrastructure.AutoMapper
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<RegisterRequest, User>();
            CreateMap<User, AuthenticateResponse>();
        }
    }
}
