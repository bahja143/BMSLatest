using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class ReceiptDetail
    {
        public int Id { get; set; }
        public Receipt? Receipt { get; set; }
        [Required]
        public int ReceiptId { get; set; }
        public Bill? Bill { get; set; }
        [Required]
        public int BillId { get; set; }
        [Required]
        public int Amount { get; set; }
    }
}