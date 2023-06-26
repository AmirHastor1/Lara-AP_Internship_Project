using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SocialMediaApp.DAL.Data;
using SocialMediaApp.DAL.Interfaces;
using System.Net;
using System.Linq;
using System.Reflection.Metadata;

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
            return _dbContext.Blog.OrderByDescending(blog => blog.BlogDate).AsQueryable();
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

        public void AddLike(Guid userId, Guid blogId)
        {
            var existingLike = _dbContext.Like.FirstOrDefault(like => like.UserId == userId && like.BlogId == blogId);
            var blog = _dbContext.Blog.FirstOrDefault(b => b.BlogId == blogId);
            var user = _dbContext.User.FirstOrDefault(b => b.UserId == userId);

            if (existingLike != null)
            {
                _dbContext.Like.Remove(existingLike);
                blog.BlogLikes -= 1;
            }
            else
            {
                Like like = new Like
                {
                    LikeId = Guid.NewGuid(),
                    UserId = userId,
                    BlogId = blogId
                };
                if (blog.UserId != userId)
                {
                    Notification notification = new Notification
                    {
                        NotificationId = Guid.NewGuid(),
                        NotificationDate = DateTime.Now,
                        UserId = blog.UserId,
                        NotificationText = user.Username + " liked your post.",

                    };
                    _dbContext.Notification.Add(notification);
                }
                _dbContext.Like.Add(like);
                blog.BlogLikes += 1;
            }
            _dbContext.SaveChanges();
        }

        public void AddComment(Guid blogId, Guid userId, string username, string commentText)
        {
            var user = _dbContext.User.FirstOrDefault(b => b.UserId == userId);
            var blog = _dbContext.Blog.FirstOrDefault(b => b.BlogId == blogId);

            Comment comment = new Comment
            {
                CommentId = Guid.NewGuid(),
                UserId = userId,
                BlogId = blogId,
                Username = username,
                CommentText = commentText
            };
            if (blog.UserId != userId)
            {
                Notification notification = new Notification
                {
                    NotificationId = Guid.NewGuid(),
                    NotificationDate = DateTime.Now,
                    UserId = blog.UserId,
                    NotificationText = user.Username + " commented on your post.",

                };
                _dbContext.Notification.Add(notification);
            }
            _dbContext.Comment.Add(comment);
            blog.BlogComments += 1;
            _dbContext.SaveChanges();

        }
        public IEnumerable<Comment> GetComments(Guid blogId)
        {
            return _dbContext.Comment.Where(comment => comment.BlogId == blogId).ToList();
        }

    }
}