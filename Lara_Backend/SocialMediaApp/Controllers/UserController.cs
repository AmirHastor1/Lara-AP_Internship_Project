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

        [HttpPost]
        public UserDTO Post([FromBody] UserDTO newUser)
        {
            return _userService.AddNewUser(newUser.FirstName, newUser.LastName, newUser.Email);
        }

        [HttpDelete("{userId}")]
        public void Delete(Guid userId)
        {
            _userService.DeleteUser(userId);
        }
    }
}
