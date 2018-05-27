using Xunit;

namespace BackEnd.Test.Infrastructure
{
    [CollectionDefinition("TestServer collection")]
    public class JobMatcherTestServer : ICollectionFixture<TestServerFixture>
    {
    }
}
