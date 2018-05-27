using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("[controller]")]
    public class CandidateController : Controller
    {
        private readonly ICandidateService _candidateService;

        public CandidateController(ICandidateService candidateService)
        {
            _candidateService = candidateService;
        }

        [HttpGet("job/{jobId}")]
        public async Task<IActionResult> GetCandidatesByJobId(int jobId)
        {
            try
            {
                var candidates = await _candidateService.GetCandidateViewModelsByJobId(jobId);
                return Json(candidates);
            }
            catch (Exception e)
            {
                //_logger.Error("Could not get user data", e);
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
    }
}