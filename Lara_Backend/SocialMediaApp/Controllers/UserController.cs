using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMediaApp.BLL.Data;
using SocialMediaApp.BLL.Interfaces;
using System.Net;

namespace SocialMediaApp.Controllers
{
    [Route("api/users")]
    [ApiController]
    [Authorize]

    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("api/register"), AllowAnonymous]
        public void RegisterUser(UserDTO user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Password))
            {
                Console.WriteLine(user.Email + " " + user.Password);
                throw new Exception("Invalid request parameters");
            }
            if (string.IsNullOrWhiteSpace(user.Email))
            {
                Console.WriteLine(user.Email + " " + user.Password);
                throw new Exception("Invalid request parameters");
            }
            if (string.IsNullOrWhiteSpace(user.Password)) { 
                Console.WriteLine(user.Email + " " + user.Password);
                throw new Exception("Invalid request parameters");
            }

            _userService.RegisterUser(user);
        }

        [HttpPost]
        [Route("api/login"), AllowAnonymous]
        public string LoginUser(LoginDTO user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Password))
                throw new Exception("Invalid request parameters");

            return _userService.LoginUser(user);
        }

        [HttpGet]
        [Route("details"), AllowAnonymous]
        public UserDetailsDTO GetUserDetailsByJwt(String jwt)
        {
            return _userService.GetUserByJwt(jwt);
        }

        [HttpGet]
        [Route("search"), AllowAnonymous]
        public UserDetailsDTO GetUserByUsername(String username)
        {
            return _userService.GetUserByUsername(username);
        }

        [HttpPost]
        [Route("api/logout"), AllowAnonymous]
        public void LogoutUser([FromBody] string jwt)
        {
            if (string.IsNullOrWhiteSpace(jwt))
                throw new Exception("Invalid request parameters");

            _userService.LogoutUser(jwt);
        }

        [HttpPost]
        [Route("user/update")]
        public void UpdateUser(UserDetailsDTO user)
        {
            string authorizationHeader = Request.Headers["Authorization"];
            string jwt = authorizationHeader?.Replace("bearer ", "");
            _userService.UpdateUser(user, jwt);
        }

        //NON AUTHENTICATION PART
        // GET: api/<MemberController>
        [HttpGet]
        [Route("all"), AllowAnonymous]
        public IEnumerable<UserDTO> GetUsers()
        {
            return _userService.GetUsers();
        }

        [HttpGet("{userId}"), AllowAnonymous]
        public UserDTO Get(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new Exception("Missing parameter");
            }
            return _userService.GetUser(userId);
        }
        /*
        [HttpPost]
        public UserDTO Post([FromBody] UserDTO newUser)
        {
            //return _userService.AddNewUser(newUser.FirstName, newUser.LastName, newUser.Email);
        }
        */
    }
}
