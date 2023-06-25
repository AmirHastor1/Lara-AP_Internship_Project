using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;

using SocialMediaApp.BLL.Data;
using SocialMediaApp.BLL.Interfaces;
using SocialMediaApp.DAL.Interfaces;
using AutoMapper;
using SocialMediaApp.DAL.Data;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Runtime.ConstrainedExecution;


namespace SocialMediaApp.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;


        public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration config)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _config = config;
        }
        /*
        public UserDTO AddNewUser(string FirstName, string LastName, string Email)
        {
            var user = _userRepository.AddNewUser(FirstName, LastName, Email);
            var convertedUser = new UserDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
            return convertedUser;
        }
        */

        public string LoginUser(LoginDTO user)
        {
            var foundUser = _userRepository.GetUser(user.Email);
            if (foundUser == null) throw new Exception("Wrong credentials");

            if (!VerifyPasswordHash(user.Password, foundUser.PasswordHash, foundUser.PasswordSalt))
            {
                throw new Exception("Wrong credentials");
            }

            if (foundUser.Jwt != null) return foundUser.Jwt;

            return CreateToken(foundUser);
        }

        public UserDetailsDTO GetUserByJwt(string jwt)
        {
            var foundUser = _userRepository.GetUserByJwt(jwt);
            if (foundUser == null) throw new Exception("User with session not found");

            var convertedUser = new UserDetailsDTO
            {
                UserId = foundUser.UserId,
                Username = foundUser.Username,
                Email = foundUser.Email,
                ProfilePicture = foundUser.ProfilePicture,
                DarkTheme = foundUser.DarkTheme,
                NotificationsOn = foundUser.NotificationsOn,
            };

            return convertedUser;
        }

        public UserDetailsDTO GetUserByEmail(string email)
        {
            var foundUser = _userRepository.GetUser(email);
            if (foundUser == null) throw new Exception("User not found");

            var convertedUser = new UserDetailsDTO
            {
                Username = foundUser.Username,
                Email = foundUser.Email,
                ProfilePicture = foundUser.ProfilePicture
            };

            return convertedUser;
        }

        public void RegisterUser(UserDTO user)
        {
            if (!_userRepository.DoesUserExist(user.Email)) throw new Exception("User already exists");


            CreatePasswordHash(user.Password, out byte[] passwordHash, out byte[] passwordSalt);

            _userRepository.RegisterUser(user.Username,user.Email, passwordHash, passwordSalt);
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            var hmac = new HMACSHA512();

            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

        }
        private static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            var hmac = new HMACSHA512(passwordSalt);

            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);

        }

        private string CreateToken(User user)
        {

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var expiryDate = DateTime.Now.AddMinutes(40);
            var token = new JwtSecurityToken(
                claims: new List<Claim>()
                {
                    new Claim(ClaimTypes.Email, user.Email)
                },
                expires: expiryDate,
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            _userRepository.InitiateToken(user, jwt, expiryDate);
            return jwt;
        }

        public void LogoutUser(string jwt)
        {
            var user = _userRepository.GetUserByJwt(jwt);
            if (user == null) throw new Exception("Wrong credentials");

            _userRepository.LogOutUser(user);
        }

        //Non Authentication part
        public void DeleteUser(Guid userId)
        {
            _userRepository.DeleteUser(userId);
        }

        public UserDTO GetUser(Guid userId)
        {
            var user = _userRepository.GetUser(userId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return _mapper.Map<UserDTO>(user);
        }

        public IEnumerable<UserDTO> GetUsers()
        {
            var users = _userRepository.GetUsers();

            //List<UserDTO> convertedUsers = new List<UserDTO>();

            return _mapper.Map<List<UserDTO>>(users);

        }
    }
}
