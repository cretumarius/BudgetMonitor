using Autofac;
using Business;
using Business.BusinessContract;

namespace Infrastructure.Autofac
{
    public class BussinessDependencyModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<UserService>().As<IUserService>();
        }
    }
}
