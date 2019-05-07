using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Entities;
using WebAPI.Interfaces;
using WebAPI.Services;

namespace WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Log> Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            byte[] passwordHash, passwordSalt;
            UserService.CreatePasswordHash("test", out passwordHash, out passwordSalt);

            modelBuilder.Entity<User>().HasData(new User()
            {
                FirstName ="Ferko", LastName = "Feric", Username = "testUser" ,
                PasswordHash = passwordHash, PasswordSalt = passwordSalt, Id = 1
            });

            for(int i=0;i < 100; i++)
            {
                modelBuilder.Entity<Log>().HasData(new Log() { UserId = 1, Id = i+1, Value = 70 + i % 20, Date = DateTime.Now.AddDays(-i) });
            }
        }
    }
}
