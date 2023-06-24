using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.BLL.Data
{
    public class BlogDTO
    {
        public Guid UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public byte[]? BlogImage { get; set; } = null;
        public string? BlogDescription { get; set; } = string.Empty;
        public int BlogLikes { get; set; } = 0;
        public int BlogComents { get; set; } = 0;
        public DateTime BlogDate { get; set; } = DateTime.Now;
    }
}
