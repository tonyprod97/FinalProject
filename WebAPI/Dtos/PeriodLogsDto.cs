﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class PeriodLogsDto
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }

        public int UserId { get; set; }
    }
}
