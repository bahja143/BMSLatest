using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class Expense
    {
        public int Id { get; set; }
        public ExpenseCategory? ExpenseCategory { get; set; }
        [Required]
        public int ExpenseCategoryId { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}