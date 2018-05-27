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
    public class JobController : Controller
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAllJobs()
        {
            try
            {
                var jobs = await _jobService.GetAllJobs();
                return Json(jobs);
            }
            catch (Exception e)
            {
                //_logger.Error("Could not get user data", e);
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
    }
}