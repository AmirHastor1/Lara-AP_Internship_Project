using System.ComponentModel.DataAnnotations;

namespace SocialMediaApp.DAL.Data
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string? Jwt { get; set; }
        public DateTime? Expiry { get; set; }
    }
}
