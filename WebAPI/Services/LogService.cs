using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.Exceptions;
using WebAPI.Helpers;
using WebAPI.Interfaces;

namespace WebAPI.Services
{
    public class LogService : ILogService
    {
        private DataContext _context;

        public LogService(DataContext context)
        {
            _context = context;
        }

        public Log Create(Log log, int userId)
        {
            if (log.Value == default(float)) throw new AppException("Value must be defined.");
            if (log.Date == null) throw new AppException("Date must be defined.");

            var user = _context.Users.Find(userId);

            if (user == null) throw new AppException("User with id {0} does not exists.", userId);

            Log logDb = _context.Logs.Where(l => l.Date.ToShortDateString() == log.Date.ToShortDateString() && l.UserId == userId).FirstOrDefault();

            if(logDb != null )
            {
                AppException ex = new AppException("You have already logged weight on {0}. Weight is: {1} kg.", logDb.Date.ToShortDateString(), logDb.Value);
                ex.Data["logData"] = logDb;
                throw ex;
            }

            _context.Logs.Add(log);
            _context.SaveChanges();

            return log;
        }

        public void Delete(int id)
        {
            Log logDb = FindDbLog(id);

            _context.Logs.Remove(logDb);
            _context.SaveChanges();
        }

        public IEnumerable<Log> GetAllByUserId(int userId)
        {
            IEnumerable<Log> logsDb = _context.Logs.Where(log => log.UserId == userId);

            return logsDb;
        }

        public Log GetById(int id)
        {
            var logDb = FindDbLog(id);
            if(logDb == null ) throw new AppException("Trying to get log which does not exists");

            return logDb;
        }

        public IEnumerable<Log> GetLogsForUser(int userId, DateTime from, DateTime to)
        {
            IEnumerable<Log> logsDb = _context.Logs.Where(
                log => log.UserId == userId && DateTime.Compare(log.Date, from) >= 0 && DateTime.Compare(log.Date, to) <= 0);
            return logsDb;
        }

        public void Update(Log log)
        {
            var logDb = FindDbLog(log.Id);

            if (logDb == null) throw new AppException("Trying to get update which does not exists");

            logDb.Value = log.Value;
            logDb.Date = log.Date;

            _context.Logs.Update(logDb);
            _context.SaveChanges();
        }

        public Statistic Statistic(int userId, DateTime from, DateTime to)
        {
            IEnumerable<Log> logs = from != DateTime.MinValue ? this.GetLogsForUser(userId, from, to) : this.GetAllByUserId(userId);
            IEnumerable<Log> valueSorted = logs.OrderBy(l => l.Value);
            IEnumerable<Log> dateSorted = logs.OrderBy(l => l.Date);
            decimal average = 0;

            if(logs.Count() > 0)
            {
                average = Convert.ToDecimal((logs.Sum(l => l.Value) / logs.Count()));
                Statistic statistic = new Statistic
                {
                    Min = valueSorted.ElementAt(0),
                    Max = valueSorted.ElementAt(logs.Count() - 1),
                    Average = Math.Round( average, 2),
                    From = dateSorted.ElementAt(0).Date,
                    To = dateSorted.ElementAt(dateSorted.Count()-1).Date,
                    TotalLogs = logs.Count()
                };
                return statistic;
            } else
            {
                return null;
            }
            

        }

        private Log FindDbLog(int id)
        {
            return _context.Logs.Find(id);
        }
    }
}
