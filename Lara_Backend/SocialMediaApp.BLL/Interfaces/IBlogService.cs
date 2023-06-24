using SocialMediaApp.BLL.Data;
using SocialMediaApp.DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.BLL.Interfaces
{
    public interface IBlogService
    {
        IEnumerable<BlogDTO> GetBlogs();
        IEnumerable<BlogDTO> GetUserBlogs(Guid userId);
        void AddNewBlog(BlogCreateDTO blog);
    }
}
