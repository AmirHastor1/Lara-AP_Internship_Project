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
            var user = new User { 
                UserId = Guid.NewGuid(),
                FirstName = FirstName,
                LastName = LastName,
                Email = Email

            };
            _dbContext.User.Add(user);
            _dbContext.SaveChanges(); // commit 
            return user;
        }
        public IEnumerable<User> GetUsers()
        {
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
        //AUTHENTICATION PART
        public bool DoesUserExist(string email)
        {
            var user = _dbContext.User.FirstOrDefault(x => x.Email == email);
            return user == null;
        }

        public User? GetUser(string email)
        {
            return _dbContext.User.AsQueryable().FirstOrDefault(x => x.Email == email);
        }

        public User? GetUserByJwt(string jwt)
        {
            return _dbContext.User.AsQueryable().FirstOrDefault(x => x.Jwt == jwt);
        }

        public void InitiateToken(User user, string jwt, DateTime expiry)
        {
            user.Jwt = jwt;
            user.Expiry = expiry;
            _dbContext.User.Update(user);
            _dbContext.SaveChanges();
        }

        public void LogOutUser(User user)
        {
            user.Jwt = null;
            user.Expiry = null;
            _dbContext.User.Update(user);
            _dbContext.SaveChanges();
        }

        public void RegisterUser(string firstName, string lastName, string email, byte[] passwordHash, byte[] passwordSalt)
        {
            User user = new User
            {
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                PasswordSalt = passwordSalt,
                PasswordHash = passwordHash,
                UserId = Guid.NewGuid()

            };
            _dbContext.User.Add(user);
            _dbContext.SaveChanges();
        }

    }
}