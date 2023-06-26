using SocialMediaApp.DAL.Data;

namespace SocialMediaApp.DAL.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();

        User GetUser(Guid userId);
        User AddNewUser(string Username, string Email);
        void DeleteUser(Guid userId);
        string GetUsernameById(Guid userId);
        User? GetUserByJwt(string jwt);
        User? GetUserByUsername(string username);

        void RegisterUser(string Username, string email, byte[] picture, byte[] passwordHash, byte[] passwordSalt);
        bool DoesUserExist(string email, string username);
        bool IsValidEmail(string email);
        bool IsValidPassword(string password);
        User? GetUser(string email);
        void InitiateToken(User user, string jwt, DateTime expiry);
        
        void LogOutUser(User user);
    }
}
