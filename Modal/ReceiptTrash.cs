using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class ReceiptTrash
    {
        public int Id { get; set; }
        [Required]
        public string PayerName { get; set; }
        [Required]
        public string MethodOfPayment { get; set; }
        [Required]
        public List<ReceiptDetailTrash>? details { get; set; }
        public string? Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public DateTime DeletedDate { get; set; }
    }
}
