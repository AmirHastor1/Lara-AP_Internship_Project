using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.DAL.Data
{
    public class Like
    {
        [Key]
        public Guid LikeId { get; set; }
        public Guid UserId { get; set; }
        public Guid BlogId { get; set; }
        
    }
}
