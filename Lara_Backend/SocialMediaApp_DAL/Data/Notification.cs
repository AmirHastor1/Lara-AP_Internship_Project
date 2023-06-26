using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.DAL.Data
{
    public class Notification
    {
        [Key]
        public Guid NotificationId { get; set; }
        public Guid UserId { get; set; }
        public DateTime NotificationDate { get; set; } = DateTime.Now;
        public string NotificationText { get; set; } = string.Empty;
        public bool NotificationSeen { get; set; } = false;
        
    }
}
