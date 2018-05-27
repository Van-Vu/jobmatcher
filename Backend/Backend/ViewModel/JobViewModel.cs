using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.ViewModel
{
    public class JobViewModel
    {
        public int JobId { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public List<string> Skills { get; set; }
    }
}
