using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Repositories;
using Backend.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.Configure<AppSettings>(Configuration.GetSection("JobMatcherSettings"));

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IJobService, JobService>();
            services.AddSingleton<ICandidateService, CandidateService>();
            services.AddSingleton<IJobRepository, JobRepository>();
            services.AddSingleton<ICandidateRepository, CandidateRepository>();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseExceptionHandler(appBuilder =>
            {
                appBuilder.Use(async (context, next) =>
                {
                    var error = context.Features[typeof(IExceptionHandlerFeature)] as IExceptionHandlerFeature;

                    context.Response.Headers.Add("Access-Control-Allow-Origin", context.Request.Headers["Access-Control-Allow-Origin"]);
                    context.Response.Headers.Add("Access-Control-Allow-Credentials", "true");

                    if (error != null && error.Error is ArgumentNullException)
                    {
                        context.Response.StatusCode = 400;
                    }
                    else if (error?.Error is SecurityTokenExpiredException)
                    {
                        context.Response.StatusCode = 401;
                    }
                    else if (error?.Error is UnauthorizedAccessException)
                    {
                        context.Response.StatusCode = 403;
                    }
                    else if (error != null && (error?.Error is ArgumentOutOfRangeException || error.Error is KeyNotFoundException))
                    {
                        context.Response.StatusCode = 404;
                    }
                    else if (error?.Error != null)
                    {
                        context.Response.StatusCode = 500;
                    }
                    else await next();

                    if (error?.Error != null)
                    {
                        context.Response.ContentType = "application/json";
                        await context.Response.WriteAsync(error.Error.Message);
                    }
                });
            });

            app.UseCors("CorsPolicy");

            app.UseMvc();
        }
    }
}
