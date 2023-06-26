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

        void RegisterUser(string Username, string email, byte[] passwordHash, byte[] passwordSalt);
        bool DoesUserExist(string email, string username);
        bool IsValidEmail(string email);
        bool IsValidPassword(string password);
        User? GetUser(string email);
        void InitiateToken(User user, string jwt, DateTime expiry);
        User? GetUserByJwt(string jwt);
        void LogOutUser(User user);
    }
}
