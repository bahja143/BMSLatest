using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class Building
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string? Address { get; set; }
    }
}