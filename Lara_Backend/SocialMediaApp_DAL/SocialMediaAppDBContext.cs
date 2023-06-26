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
        public DbSet<Blog> Blog { get; set; } //Blog Table in DB
        public DbSet<Like> Like { get; set; } //Like Table in DB
        public DbSet<Comment> Comment { get; set; } //Comment Table in DB
        public DbSet<Notification> Notification { get; set; } //Notification Table in DB
    }
}