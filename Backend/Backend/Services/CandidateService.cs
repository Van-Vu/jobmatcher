using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Model;
using Backend.Repositories;
using Backend.ViewModel;

namespace Backend.Services
{
    public class CandidateService: ICandidateService
    {
        private readonly ICandidateRepository _candidateRepository;
        private readonly IJobRepository _jobRepository;

        public CandidateService(ICandidateRepository candidateRepository, IJobRepository jobRepository)
        {
            _candidateRepository = candidateRepository;
            _jobRepository = jobRepository;
        }

        public async Task<IEnumerable<CandidateViewModel>> GetCandidateViewModelsByJobId(int jobId)
        {
            var candidates = await _candidateRepository.GetCandidates();
            var job = await _jobRepository.GetJobById(jobId);

            var jobSkills = job.Skills.Split(", ");
            var viewModel = new List<CandidateViewModel>();

            foreach (var candidate in candidates)
            {
                var candidateSkills = candidate.SkillTags.Split(", ");
                var matchSkills = jobSkills.Intersect(candidateSkills);

                viewModel.Add(new CandidateViewModel
                {
                    CandidateId = candidate.CandidateId,
                    Name = candidate.Name,
                    SkillTags = candidate.SkillTags,
                    PercentageMatch = matchSkills.Count() * 100 /  jobSkills.Count()
                });
            }

            return viewModel;
        }
    }
}
