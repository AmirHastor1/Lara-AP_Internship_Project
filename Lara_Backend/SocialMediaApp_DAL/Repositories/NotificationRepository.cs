using Microsoft.EntityFrameworkCore;
using SocialMediaApp.DAL.Data;
using SocialMediaApp.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.DAL.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly SocialMediaAppDBContext _dbContext;

        public NotificationRepository(SocialMediaAppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Notification> GetNotifications()
        {
            return _dbContext.Notification.AsQueryable();
        }

        public IEnumerable<Notification> GetUserNotifications(Guid userId)

        {
            return _dbContext.Notification.Where(notification => notification.UserId == userId).ToList();
        }
        public IEnumerable<Notification> GetLatestUserNotifications(Guid userId, int count)
        {
            return _dbContext.Notification
                .Where(notification => notification.UserId == userId)
                .OrderByDescending(notification => notification.NotificationDate)
                .Take(count)
                .ToList();
        }

    }
}