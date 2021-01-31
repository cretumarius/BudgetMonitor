using Autofac;
using DataAccess.Base;
using DataAccess.Base.Context;
using DataAccess.Repository;
using Domain.Base;
using Domain.Users;

namespace Infrastructure.Autofac
{
    public class DataAccessDependencyModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();
            builder.RegisterType<DataContext>().As<IDataContext>().InstancePerLifetimeScope();

            builder.RegisterType<UserRepository>().As<IUserRepository>().InstancePerLifetimeScope();
        }
    }
}
