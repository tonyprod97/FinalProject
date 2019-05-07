using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Entities;
using WebAPI.Exceptions;
using WebAPI.Helpers;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LogsController : ControllerBase
    {
        private ILogService _logService;
        private IMapper _mapper;

        public LogsController(ILogService logService, IMapper mapper) 
        {
            _logService = logService;
            _mapper = mapper;
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]LogDto logDto)
        {
            Log log = _mapper.Map<Log>(logDto);

            try
            {
                Log newLog = _logService.Create(log, logDto.UserId);
                return Ok(_mapper.Map<LogDto>(newLog));
            }
            catch (AppException ex)
            {
                if (ex.Data["logData"] != null) return Conflict(new { message = ex.Message, logData = ex.Data["logData"] });
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("update")]
        public IActionResult Update([FromBody]LogDto logDto)
        {
            Log log = _mapper.Map<Log>(logDto);

            _logService.Update(log);
            return Ok(logDto);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _logService.Delete(id);
            return Ok(id);
        }

        [HttpPost("get/period")]
        public IActionResult Get([FromBody]PeriodLogsDto userLogsDto)
        {
            IEnumerable<Log> logs = _logService.GetLogsForUser(userLogsDto.UserId, userLogsDto.From, userLogsDto.To);
            IEnumerable<LogDto> logsDto = _mapper.Map<IEnumerable<LogDto>>(logs);
            logsDto = logsDto.OrderBy(log => log.Date);

            return Ok(logsDto);
        }

        [HttpGet("get/{userId}")]
        public IActionResult GetAll(int userId)
        {
            IEnumerable<Log> logs = _logService.GetAllByUserId(userId);
            IEnumerable<LogDto> logsDto = _mapper.Map<IEnumerable<LogDto>>(logs);
            logsDto = logsDto.OrderBy(log => log.Date);

            return Ok(logsDto);
        }

        [HttpPost("statistic")]
        public IActionResult GetStatistic([FromBody]PeriodLogsDto periodLogsDto)
        {
            Statistic statistic =  _logService.Statistic(periodLogsDto.UserId, periodLogsDto.From, periodLogsDto.To);
            return Ok(statistic);
        }
    }
}
