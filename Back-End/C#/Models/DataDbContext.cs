using System;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Models
{
    public class DataDbContext : DbContext 
    {
        public DataDbContext(DbContextOptions<DataDbContext> options)
        : base(options)
        {}
        public DbSet<Restaurantes> restaurantes { get; set;}
        public DbSet<Pratos> pratos { get; set;}


    }
}