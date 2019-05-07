using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.Helpers
{
    public class Statistic
    {
        public Log Min { get; set; }
        public Log Max { get; set; }
        public decimal Average { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public int TotalLogs { get; set; }
    }
}
