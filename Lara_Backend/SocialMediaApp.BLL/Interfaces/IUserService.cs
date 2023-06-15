using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SocialMediaApp.BLL.Data;
using SocialMediaApp.DAL.Data;

namespace SocialMediaApp.BLL.Interfaces
{
    public interface IUserService
    {
        IEnumerable<UserDTO> GetUsers();
        UserDTO GetUser(Guid UserId);
        UserDTO AddNewUser(string FirstName, string LastName, string Email);
        void DeleteUser(Guid userId);
    }
}
