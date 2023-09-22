using BMSystem.Modal;
using BMSystem.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/rooms")]
    public class RoomsController : Controller
    {
        private BMSDbContext _context { get; set; }

        public RoomsController(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context.Rooms.Include(r => r.Building).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .Rooms
                .SingleOrDefaultAsync(c => c.Id == Id));
        }

        [HttpPost]
        public async Task<ActionResult> post([FromBody] Room room)
        {
            if (!ModelState.IsValid) return BadRequest();

            var roomDb =
             await _context.Rooms.AsNoTracking().SingleOrDefaultAsync(c => c.RoomNumber == room.RoomNumber);

            if (roomDb != null) return BadRequest("This room already registered");


            await _context.Rooms.AddAsync(room);
            await _context.SaveChangesAsync();

            return Ok(room);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> put(int Id, [FromBody] Room room)
        {
            var roomDb =
                await _context.Rooms.AsNoTracking().SingleOrDefaultAsync(c => c.Id == Id);

            if (roomDb == null) return NotFound();

            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();

            return Ok(room);
        }
    }
}
