using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Model;
using Backend.Repositories;

namespace Backend.Services
{
    public class JobService: IJobService
    {
        private readonly IJobRepository _jobRepository;

        public JobService(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public async Task<IEnumerable<JobModel>> GetAllJobs()
        {
            return await _jobRepository.GetJobs();
        }
    }
}
