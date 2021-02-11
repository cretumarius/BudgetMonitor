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
            builder.RegisterType<OCRService>().As<IOCRService>();
            builder.RegisterType<ExportService>().As<IExportService>();
            builder.RegisterType<MergeService>().As<IMergeService>();
            builder.RegisterType<UploadService>().As<IUploadService>();
        }
    }
}
