using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Model;

namespace Backend.Repositories
{
    public interface IJobRepository
    {
        Task<JobModel> GetJobById(int jobId);
        Task<IEnumerable<JobModel>> GetJobs();
    }
}
