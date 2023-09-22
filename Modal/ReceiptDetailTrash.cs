using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class ReceiptDetailTrash
    {
        public int Id { get; set; }
        public ReceiptTrash? ReceiptTrash { get; set; }
        [Required]
        public int ReceiptTrashId { get; set; }
        public Bill? Bill { get; set; }
        [Required]
        public int BillId { get; set; }
        [Required]
        public int Amount { get; set; }
    }
}