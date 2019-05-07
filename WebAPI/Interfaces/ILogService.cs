using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;
using WebAPI.Helpers;

namespace WebAPI.Interfaces
{
    public interface ILogService
    {
        IEnumerable<Log> GetAllByUserId(int userId);
        IEnumerable<Log> GetLogsForUser(int userId, DateTime from, DateTime to);

        Log GetById(int id);
        Log Create(Log log, int userId);
        void Update(Log log);
        void Delete(int id);

        Statistic Statistic(int userId, DateTime from, DateTime to);
    }
}
