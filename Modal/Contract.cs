using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class Contract
    {
        public int Id { get; set; }
        public Tenant? Tenant { get; set; }
        [Required]
        public int TenantId { get; set; }
        public Room? Room { get; set; }
        [Required]
        public int RoomId { get; set; }
        [Required]
        public int AmountPerSq { get; set; }
        [Required]
        public string License { get; set; }
        [Required]
        public string TNo { get; set; }
        public bool IsCurrent { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        public DateTime Date { get; set; }
        public string? Witness1 { get; set; }
        public string? Witness2 { get; set; }
        public string? Witness3 { get; set; }
    }
}
