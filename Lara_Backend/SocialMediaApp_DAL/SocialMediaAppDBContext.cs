using Microsoft.EntityFrameworkCore;
using SocialMediaApp.DAL.Data;

namespace SocialMediaApp.DAL
{
    public class SocialMediaAppDBContext : DbContext
    {
        public SocialMediaAppDBContext(DbContextOptions<SocialMediaAppDBContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; } //User Table in DB
    }
}