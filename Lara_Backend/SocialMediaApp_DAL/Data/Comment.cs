using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.DAL.Data
{
    internal class Comment
    {
        public Guid CommentId { get; set; }
        public Guid BlogId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string CommentText { get; set; } = string.Empty;
    }
}
