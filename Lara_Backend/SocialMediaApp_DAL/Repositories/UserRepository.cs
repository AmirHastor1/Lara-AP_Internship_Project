using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SocialMediaApp.DAL.Data;
using SocialMediaApp.DAL.Interfaces;
using System.Net;

namespace SocialMediaApp.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SocialMediaAppDBContext _dbContext;

        public UserRepository(SocialMediaAppDBContext dbContext)
        {
            _dbContext= dbContext;
        }
        public User AddNewUser(string FirstName, string LastName, string Email)
        {
            var user = new User { UserId = Guid.NewGuid(), FirstName = FirstName, LastName = LastName, Email = Email};
            _dbContext.User.Add(user);
            _dbContext.SaveChanges(); // commit 
            return user;
        }
        public IEnumerable<User> GetUsers()
        {
            /*List<User> users = new List<User>()
            {
                new User
                {
                    UserId = Guid.NewGuid(),
                    FirstName = "Amir",
                    LastName = "Hastor",
                    Email = "amir@gmail.com"
                },
                new User
                {
                    UserId = Guid.NewGuid(),
                    FirstName = "Nedim",
                    LastName = "Nedimovic",
                    Email = "nedim@gmail.com"
                }
            };

            return users;
            */
            return _dbContext.User.AsQueryable();
        }

        public User GetUser(Guid userId)
        {
            return (_dbContext.User.Where(x => x.UserId == userId).FirstOrDefault())!;
        }

        public void DeleteUser(Guid userId)
        {
            var user = _dbContext.User.Where(x => x.UserId == userId).FirstOrDefault();
            _dbContext.User.Remove(user);
            _dbContext.SaveChanges();
            if (user!=null)
            {
                
            }
            else
            { 
                Console.WriteLine("Error: User does not exist");
            }
            
        }
    }
}