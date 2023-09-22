using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class Message
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Body { get; set; }
        public DateTime Date { get; set; }
    }
}