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
using Newtonsoft.Json;
using Xunit;

namespace BackEnd.Test
{
    public class CandidateRepositoryTest
    {
        private readonly Mock<IOptions<AppSettings>> _optionsMock;

        public CandidateRepositoryTest()
        {
            _optionsMock = new Mock<IOptions<AppSettings>>();
            _optionsMock.Setup(x => x.Value).Returns(() => new AppSettings
            {
                CandidateUrl = "http://private-76432-jobadder1.apiary-mock.com/candidates"
            });
        }

        [Fact]
        [Trait("IntegrationTest", "CandidateRepository")]
        public async Task GetCandidates()
        {
            // Arrange
            var candidateRepository = new CandidateRepository(_optionsMock.Object);

            // Act
            var candidates = await candidateRepository.GetCandidates();

            // Assert
            candidates.Count().Should().Be(200);
        }
    }
}
