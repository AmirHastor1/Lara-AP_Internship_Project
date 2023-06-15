using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SocialMediaApp.BLL.Data;
using SocialMediaApp.BLL.Interfaces;
using SocialMediaApp.DAL.Interfaces;
using AutoMapper;
using SocialMediaApp.DAL.Data;
using System.Net;


namespace SocialMediaApp.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

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

            List<UserDTO> convertedUsers = new List<UserDTO>();

            return _mapper.Map<List<UserDTO>>(users);

        }
    }
}
