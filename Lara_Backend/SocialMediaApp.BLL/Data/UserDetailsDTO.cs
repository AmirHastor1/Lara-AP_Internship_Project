using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.BLL.Data
{
    public class UserDetailsDTO
    {
        public Guid UserId { get; set; }
        public string Username { get; set; } 
        public string Email { get; set; }
        public byte[] ProfilePicture { get; set; }
        public bool DarkTheme { get; set; } 
        public bool NotificationsOn { get; set; }
    }
}
