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
        private IEnumerable<JobModel> _jobCache;

        public JobRepository(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task<IEnumerable<JobModel>> GetJobs()
        {
            if (_jobCache != null) return _jobCache;


            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(new Uri(_appSettings.JobUrl));
                using (var content = response.Content)
                {
                    var json = await content.ReadAsStringAsync();
                    _jobCache = JsonConvert.DeserializeObject<IEnumerable<JobModel>>(json);
                }
            }
            return _jobCache;
        }

        public async Task<JobModel> GetJobById(int jobId)
        {
            if (_jobCache == null)
            {
                await GetJobs();
            }

            return _jobCache.FirstOrDefault(x => x.JobId == jobId);
        }
    }
}
