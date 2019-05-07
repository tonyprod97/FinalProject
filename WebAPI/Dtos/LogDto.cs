using System;

namespace WebAPI.Dtos
{
    public class LogDto
    {
        public int Id { get; set; }
        public float Value { get; set; }
        public DateTime Date { get; set; }

        public int UserId { get; set; }
    }
}