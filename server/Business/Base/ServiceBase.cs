using AutoMapper;
using Domain.Base;

namespace Business.Base
{
    public abstract class ServiceBase
    {
        public readonly IUnitOfWork UnitOfWork;
        public readonly IMapper Mapper;

        protected ServiceBase(IUnitOfWork UnitOfWork, IMapper Mapper)
        {
            this.UnitOfWork = UnitOfWork;
            this.Mapper = Mapper;
        }
    }
}
