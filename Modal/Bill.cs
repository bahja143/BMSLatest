using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class Bill
    {
        public int Id { get; set; }
        public Contract? Contract { get; set; }
        [Required]
        public int ContractId { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        public DateTime DueDate { get; set; }
        public string? Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
