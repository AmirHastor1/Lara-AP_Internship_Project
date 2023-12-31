﻿using System;
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
        // UserDTO AddNewUser(string Username, string Email);
        UserDetailsDTO GetUserByEmail(String email);
        UserDetailsDTO GetUserByJwt(String jwt);
        UserDetailsDTO GetUserByUsername(string username);
        void UpdateUser(UserDetailsDTO user,string jwt);
        void DeleteUser(Guid userId);
        void RegisterUser(UserDTO user);
        string LoginUser(LoginDTO user);
        void LogoutUser(string jwt);
    }
}
