using System;
using API.Helpers;
using Autofac;
using AutoMapper;
using Business.BusinessModels.Request.Validation;
using DataAccess.Base.Context;
using Domain.Base.EntityBase;
using FluentValidation.AspNetCore;
using Infrastructure.Autofac;
using Infrastructure.AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Azure.Storage.Blobs;
using Business;
using Business.Base;
using System.Collections.Generic;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration
        {
            get;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            IronPdf.License.LicenseKey = "IRONPDF.DEVTEAM.2430-B4C2ABF860-CX7UPRCGSBXAL5S-EQPLEYXQ64LR-ESZDXVYQDA5H-CUGEEQKSKBGU-YE2EH5VZZDQV-M73B2B-TRA47BMT23N4UA-DEPLOYMENT.TRIAL-L3V65R.TRIAL.EXPIRES.17.FEB.2021";
            services.AddDbContext<DataContext>(options =>
          options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddCors(options => {
                options.AddPolicy("CorsPolicy",
                  builder => builder.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());
            });

            services.AddControllers();

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(setup => {
                // Include 'SecurityScheme' to use JWT Authentication
                var jwtSecurityScheme = new OpenApiSecurityScheme
                {
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Name = "JWT Authentication",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Description = "Put **_ONLY_** your JWT Bearer token on textbox below!",

                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };

                setup.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

                setup.AddSecurityRequirement(new OpenApiSecurityRequirement {
          {
            jwtSecurityScheme,
            Array.Empty < string > ()
          }
        });
            });

            services.AddAutoMapper(x => x.AddProfile(new DomainProfile()
            {
                AllowNullCollections = true
            }));

            services.AddMvc(options => options.Filters.Add(typeof(ValidatorActionFilter)))
              .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<UserValidator>());

            // configure strongly typed settings object
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            ConfigureAzureBlobContainer(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = string.Empty;
            });

            app.UseRouting();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule(new BussinessDependencyModule());
            builder.RegisterModule(new DataAccessDependencyModule());
        }

        private void ConfigureAzureBlobContainer(IServiceCollection services)
        {
            AzureBlobContainerClientFactory factory = key =>
            {
                switch (key)
                {
                    case BlobContainerNames.DocumentsContainerName:
                        return new AzureBlobContainerClient(
                            new BlobContainerClient(Configuration["CloudStorageConnectionString"], Configuration["BlobContainerName"]));
                    default:
                        throw new KeyNotFoundException();
                }
            };

            services.AddScoped(serviceProvider => factory);
#if DEBUG
            factory(BlobContainerNames.DocumentsContainerName).CreateIfNotExists();
#endif

        }
    }
}