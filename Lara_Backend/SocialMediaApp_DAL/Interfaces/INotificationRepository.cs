using SocialMediaApp.DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.DAL.Interfaces
{
    public interface INotificationRepository
    {
        IEnumerable<Notification> GetNotifications();
        IEnumerable<Notification> GetUserNotifications(Guid userId);
        IEnumerable<Notification> GetLatestUserNotifications(Guid userId, int count);


    }
}
