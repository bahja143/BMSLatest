using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class Tenant
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Telephone { get; set; }
        public string? Photo { get; set; }
        [Required]
        public string IdentityDocument { get; set; }
        public string? MessageChannel { get; set; }
        public string? Address { get; set; }
    }
}
