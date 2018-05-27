using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Model;
using Backend.Repositories;
using Backend.ViewModel;

namespace Backend.Services
{
    public class JobService: IJobService
    {
        private readonly IJobRepository _jobRepository;

        public JobService(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public async Task<IEnumerable<JobViewModel>> GetAllJobs()
        {
            var jobs = await _jobRepository.GetJobs();
            var jobList = jobs.Select(job => new JobViewModel
            {
                JobId = job.JobId, Company = job.Company, Name = job.Name, Skills = job.Skills.Split(", ").ToList()
            }).ToList();

            return jobList;
        }
    }
}
