using SocialMediaApp.BLL.Data;
using SocialMediaApp.DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.BLL.Interfaces
{
    public interface INotificationService
    {
        IEnumerable<NotificationDTO> GetNotifications();
        IEnumerable<NotificationDTO> GetUserNotifications(Guid userId);
        IEnumerable<NotificationDTO> GetLatestUserNotifications(Guid userId, int count);
    }
}
