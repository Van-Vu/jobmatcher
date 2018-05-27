using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using Backend;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;

namespace BackEnd.Test.Infrastructure
{
    public class TestServerFixture : IDisposable
    {
        public TestServer Server { get; }
        public HttpClient Client { get; }

        public TestServerFixture()
        {
            var hostBuilder = new WebHostBuilder()
                .UseEnvironment("Development")
                .UseConfiguration(new ConfigurationBuilder()
                    .AddJsonFile("appsettings.json")
                    .Build()
                )
                .UseStartup<Startup>();

            Server = new TestServer(hostBuilder);
            Client = Server.CreateClient();
        }

        public void Dispose()
        {
            Server.Dispose();
            Client.Dispose();
        }

        public TService GetService<TService>()
            where TService : class
        {
            return Server?.Host?.Services?.GetService(typeof(TService)) as TService;
        }
    }
}
