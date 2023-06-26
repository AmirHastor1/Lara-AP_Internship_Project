using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.BLL.Data
{
    public class LikeDTO
    {
        public Guid UserId { get; set; }
        public Guid BlogId { get; set; }
    }
}
