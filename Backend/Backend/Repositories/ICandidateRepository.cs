using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Model;

namespace Backend.Repositories
{
    public interface ICandidateRepository
    {
        Task<IEnumerable<CandidateModel>> GetCandidates();
    }
}
