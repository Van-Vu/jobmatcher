using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ViewModel
{
    public class CandidateViewModel
    {
        public int CandidateId { get; set; }
        public string Name { get; set; }
        public string SkillTags { get; set; }
        public int PercentageMatch { get; set; }
    }
}
