using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend;
using Backend.Repositories;
using FluentAssertions;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace BackEnd.Test
{
    public class JobRepositoryTest
    {
        private readonly Mock<IOptions<AppSettings>> _optionsMock;

        public JobRepositoryTest()
        {
            _optionsMock = new Mock<IOptions<AppSettings>>();
            _optionsMock.Setup(x => x.Value).Returns(() => new AppSettings
            {
                JobUrl = "http://private-76432-jobadder1.apiary-mock.com/jobs"
            });
        }

        [Fact]
        [Trait("IntegrationTest", "JobRepository")]
        public async Task GetJobs()
        {
            // Arrange
            var jobRepository = new JobRepository(_optionsMock.Object);

            // Act
            var jobs = await jobRepository.GetJobs();

            // Assert
            jobs.Count().Should().Be(15);
        }
    }
}
