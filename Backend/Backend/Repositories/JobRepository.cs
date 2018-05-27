using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Backend.Model;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Backend.Repositories
{
    public class JobRepository: IJobRepository
    {
        private readonly AppSettings _appSettings;
        public JobRepository(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task<IEnumerable<JobModel>> GetJobs()
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(new Uri(_appSettings.JobUrl));
                using (var content = response.Content)
                {
                    var json = await content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<IEnumerable<JobModel>>(json);
                }

            }
        }
    }
}
