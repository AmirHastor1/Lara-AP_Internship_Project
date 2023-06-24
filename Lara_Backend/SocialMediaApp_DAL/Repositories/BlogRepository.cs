using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SocialMediaApp.DAL.Data;
using SocialMediaApp.DAL.Interfaces;
using System.Net;
using System.Linq;

namespace SocialMediaApp.DAL.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly SocialMediaAppDBContext _dbContext;

        public BlogRepository(SocialMediaAppDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<Blog> GetBlogs()
        {
            return _dbContext.Blog.AsQueryable();
        }
        public IEnumerable<Blog> GetUserBlogs(Guid userId)
        {
            return _dbContext.Blog.Where(blog => blog.UserId == userId).ToList();
        }
        public void AddNewBlog(Guid userId, byte[] image, string description)
        {
            Blog blog = new Blog
            {
                BlogId = Guid.NewGuid(),
                UserId = userId,
                BlogImage = image,
                BlogDescription= description

            };
            _dbContext.Blog.Add(blog);
            _dbContext.SaveChanges();
        }

    }
}