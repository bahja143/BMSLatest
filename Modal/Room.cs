using System.ComponentModel.DataAnnotations;

namespace BMSystem.Modal
{
    public class Room
    {
        public int Id { get; set; }
        [Required]
        public string RoomNumber { get; set; }
        [Required]
        public int RoomSizeInSq { get; set; }
        [Required]
        public string FloorNo { get; set; }
        public Building? Building { get; set; }
        [Required]
        public int BuildingId { get; set; }
        public string? Description { get; set; }
    }
}
