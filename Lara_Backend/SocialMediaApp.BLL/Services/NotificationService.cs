using AutoMapper;
using Microsoft.Extensions.Configuration;
using SocialMediaApp.BLL.Data;
using SocialMediaApp.BLL.Interfaces;
using SocialMediaApp.DAL.Interfaces;
using SocialMediaApp.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.BLL.Services
{
    public class NotificationService : INotificationService
    {
        //private readonly IBlogRepository _blogRepository;
        //private readonly IUserRepository _userRepository;
        private readonly INotificationRepository _notificationRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;


        public NotificationService(INotificationRepository notificationRepository, IMapper mapper, IConfiguration config)
        {
            _notificationRepository = notificationRepository;
            _mapper = mapper;
            _config = config;
        }

        public IEnumerable<NotificationDTO> GetNotifications()
        {
            var notifications = _notificationRepository.GetNotifications();
            List<NotificationDTO> convertedNotifications = new List<NotificationDTO>();
            convertedNotifications = _mapper.Map<List<NotificationDTO>>(notifications);
            
            return convertedNotifications;
        }

        public IEnumerable<NotificationDTO> GetUserNotifications(Guid userId)
        {
            var notifications = _notificationRepository.GetUserNotifications(userId);
            List<NotificationDTO> convertedNotifications = new List<NotificationDTO>();
            convertedNotifications = _mapper.Map<List<NotificationDTO>>(notifications);

            return convertedNotifications;
        }
        public IEnumerable<NotificationDTO> GetLatestUserNotifications(Guid userId,int count)
        {
            var notifications = _notificationRepository.GetLatestUserNotifications(userId, count);
            List<NotificationDTO> convertedNotifications = new List<NotificationDTO>();
            convertedNotifications = _mapper.Map<List<NotificationDTO>>(notifications);

            return convertedNotifications;
        }


    }
}
