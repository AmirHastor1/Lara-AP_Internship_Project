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
        public string GetUsernameById(Guid userId)
        {
            var user = _dbContext.User.FirstOrDefault(u => u.UserId == userId);
            return user?.Username;
        }
        public User AddNewUser(string username, string Email)
        {
            var user = new User { 
                UserId = Guid.NewGuid(),
                Username= username,
                Email = Email

            };
            _dbContext.User.Add(user);
            _dbContext.SaveChanges(); // commit 
            return user;
        }
        public void UpdateUser(string jwt, Guid userId, string username, string email, byte[] picture, bool darktheme, bool notificationsOn)
        {
            var user = _dbContext.User.FirstOrDefault(u => u.UserId == userId && u.Jwt == jwt);
            if (user != null)
            {
                // Update the user properties
                user.ProfilePicture = picture;
                user.DarkTheme = darktheme;
                user.NotificationsOn = notificationsOn;

                _dbContext.SaveChanges();
            }
            else
            {
                throw new Exception("Validation Failed");

            }

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
        public bool DoesUserExist(string email, string username)
        {
            var emailCheck = _dbContext.User.FirstOrDefault(x => x.Email == email);
            var userCheck = _dbContext.User.FirstOrDefault(x => x.Username == username);
            return (emailCheck == null && userCheck == null);
        }

        public bool IsValidEmail(string email)
        {
            try
            {
                var address = new System.Net.Mail.MailAddress(email);
                return address.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public bool IsValidPassword(string password)
        {
            return password.Length >= 5 && password.Length <= 10;
        }

        public User? GetUser(string email)
        {
            Console.WriteLine("EMAAIAL IS: " + email);
            if (!string.IsNullOrEmpty(email))
                return _dbContext.User.AsQueryable().FirstOrDefault(x => x.Email == email);
            else
            {
                return null;
            }
        }

        public User? GetUserByJwt(string jwt)
        {
            return _dbContext.User.AsQueryable().FirstOrDefault(x => x.Jwt == jwt);
        }
        public User? GetUserByUsername(string username)
        {
            return _dbContext.User.AsQueryable().FirstOrDefault(x => x.Username == username);
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

        public void RegisterUser(string username, string email, byte[] picture, byte[] passwordHash, byte[] passwordSalt)
        {
            User user = new User
            {
                Username = username,
                Email = email,
                PasswordSalt = passwordSalt,
                PasswordHash = passwordHash,
                UserId = Guid.NewGuid(),
                ProfilePicture = picture
                

            };
            _dbContext.User.Add(user);
            _dbContext.SaveChanges();
        }

    }
}