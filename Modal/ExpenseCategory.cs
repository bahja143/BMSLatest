using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class ExpenseCategory
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}