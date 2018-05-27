using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Model;
using Backend.ViewModel;

namespace Backend.Services
{
    public interface ICandidateService
    {
        Task<IEnumerable<CandidateViewModel>> GetCandidateViewModelsByJobId(int jobId);
    }
}
