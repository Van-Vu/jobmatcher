using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Model;
using Backend.ViewModel;

namespace Backend.Services
{
    public interface IJobService
    {
        Task<IEnumerable<JobViewModel>> GetAllJobs();
    }
}
