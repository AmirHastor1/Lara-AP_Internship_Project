using SocialMediaApp.DAL.Data;

namespace SocialMediaApp.DAL.Interfaces
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUsers();

        User GetUser(Guid userId);
        User AddNewUser(string FirstName, string LastName, string Email);
        void DeleteUser(Guid userId);
    }
}
