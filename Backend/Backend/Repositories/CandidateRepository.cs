using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Backend.Model;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Backend.Repositories
{
    public class CandidateRepository: ICandidateRepository
    {
        private readonly AppSettings _appSettings;

        public CandidateRepository(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task<IEnumerable<CandidateModel>> GetCandidates()
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetAsync(new Uri(_appSettings.CandidateUrl));
                using (var content = response.Content)
                {
                    var json = await content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<IEnumerable<CandidateModel>>(json);
                }
                
            }
        }
    }
}
