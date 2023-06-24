using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.BLL.Data
{
    public class BlogCreateDTO
    {
        public Guid UserId { get; set; }
        public byte[]? BlogImage { get; set; } = null;
        public string? BlogDescription { get; set; } = string.Empty;
    }
}
