using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class AppDataContext : DbContext
    {
        public AppDataContext(DbContextOptions<AppDataContext> options) : base(options) { }

        public DbSet<Animal> Animais { get; set; }
        public DbSet<Cuidado> Cuidados { get; set; }
    }
}