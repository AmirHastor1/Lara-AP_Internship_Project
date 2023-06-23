using SocialMediaApp.DAL.Data;

namespace SocialMediaApp.DAL.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();

        User GetUser(Guid userId);
        User AddNewUser(string FirstName, string LastName, string Email);
        void DeleteUser(Guid userId);
        void RegisterUser(string firstName, string lastName,string email, byte[] passwordHash, byte[] passwordSalt);
        bool DoesUserExist(string email);
        User? GetUser(string email);
        void InitiateToken(User user, string jwt, DateTime expiry);

        User? GetUserByJwt(string jwt);
        void LogOutUser(User user);
    }
}
