using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class Tenant
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string? Telephone { get; set; }
        public string? Photo { get; set; }
        public string? IdentityDocument { get; set; }
        public string? MessageChannel { get; set; }
        public string? Address { get; set; }
    }
}
