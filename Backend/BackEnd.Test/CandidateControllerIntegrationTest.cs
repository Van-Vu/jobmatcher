using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.ViewModel;
using BackEnd.Test.Infrastructure;
using FluentAssertions;
using Newtonsoft.Json;
using Xunit;

namespace BackEnd.Test
{
    [Collection("TestServer collection")]
    public class CandidateControllerIntegrationTest
    {
        private readonly TestServerFixture _fixture;

        public CandidateControllerIntegrationTest(TestServerFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        [Trait("IntegrationTest", "CandidateController")]
        public async Task GetCandidatesByJobId_ExpectsCandatesDataWithPercentage()
        {
            // Act
            var response = await _fixture.Client.GetAsync("/candidate/job/1");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();

            // Assert
            var candidates = JsonConvert.DeserializeObject<IEnumerable<CandidateViewModel>>(responseString).ToList();
            candidates.FirstOrDefault()?.PercentageMatch.Should().Be(10);
            candidates.Count.Should().Be(200);
        }
    }
}
