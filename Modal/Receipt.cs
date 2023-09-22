using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class Receipt
    {
        public int Id { get; set; }
        [Required]
        public string PayerName { get; set; }
        [Required]
        public string MethodOfPayment { get; set; }
        [Required]
        public List<ReceiptDetail>? details { get; set; }
        public string? Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
