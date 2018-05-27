using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Model;

namespace Backend.Services
{
    public interface IJobService
    {
        Task<IEnumerable<JobModel>> GetAllJobs();
    }
}
