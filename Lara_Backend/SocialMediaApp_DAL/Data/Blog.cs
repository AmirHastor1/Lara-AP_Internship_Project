using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.DAL.Data
{
    public class Blog
    {
        [Key]
        public Guid BlogId { get; set; }
        public Guid UserId { get; set; }
        public byte[]? BlogImage { get; set; }
        public string? BlogDescription { get; set; } = string.Empty;
        public int BlogLikes { get; set; } = 0;
        public int BlogComments { get; set; } = 0;
        public DateTime BlogDate { get; set; } = DateTime.Now;
       
    }
}
