using SocialMediaApp.DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.DAL.Interfaces
{
    public interface IBlogRepository
    {
        IEnumerable<Blog> GetBlogs();
        IEnumerable<Blog> GetUserBlogs(Guid userId);
        void AddNewBlog(Guid userId, byte[] image, string description);
         
    }
}
