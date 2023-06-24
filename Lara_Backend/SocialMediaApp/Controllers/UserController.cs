using Microsoft.AspNetCore.Mvc;
using SocialMediaApp.BLL.Data;
using SocialMediaApp.BLL.Interfaces;

namespace SocialMediaApp.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("api/register")]
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
        [Route("api/login")]
        public string LoginUser(LoginDTO user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Password))
                throw new Exception("Invalid request parameters");

            return _userService.LoginUser(user);
        }

        [HttpGet]
        [Route("details")]
        public UserDetailsDTO GetUserDetails(String email)
        {
            return _userService.GetUserByEmail(email);
        }

        [HttpPost]
        [Route("api/logout")]
        public void LogoutUser([FromBody] string jwt)
        {
            if (string.IsNullOrWhiteSpace(jwt))
                throw new Exception("Invalid request parameters");

            _userService.LogoutUser(jwt);
        }

        //NON AUTHENTICATION PART
        // GET: api/<MemberController>
        [HttpGet]
        public IEnumerable<UserDTO> GetUsers()
        {
            return _userService.GetUsers();
        }

        [HttpGet("{userId}")]
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
        [HttpDelete("{userId}")]
        public void Delete(Guid userId)
        {
            _userService.DeleteUser(userId);
        }
    }
}
