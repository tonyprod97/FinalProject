using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public List<Log> Logs { get; set; }
    }
}