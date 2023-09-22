using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class MessageDetail
    {
        public int Id { get; set; }
        public Tenant? Tenant { get; set; }
        [Required]
        public int TenantId { get; set; }
        public Message? Message { get; set; }
        [Required]
        public int MessageId { get; set; }
        [Required]
        public string Channel { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
