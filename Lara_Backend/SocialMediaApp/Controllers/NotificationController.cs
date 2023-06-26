using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialMediaApp.BLL.Data;
using SocialMediaApp.BLL.Interfaces;
using System.Collections.Generic;

namespace SocialMediaApp.Controllers
{
    [Route("api/notifications")]
    [ApiController]
    [Authorize]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet]
        [Route("user/latest"), AllowAnonymous]
        public IEnumerable<NotificationDTO> GetLatestUserNotifications(Guid userId)
        {
            return _notificationService.GetLatestUserNotifications(userId,3);
        }

    }
}
