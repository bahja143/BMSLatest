using BMSystem.Modal;
using BMSystem.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/messages")]
    public class MessagesController : Controller
    {
        public BMSDbContext _context { get; set; }

        public MessagesController(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context
                .Messages
                .ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .Messages
                .SingleOrDefaultAsync(m => m.Id == Id));
        }

        [HttpPost]
        public async Task<ActionResult> post([FromBody] Message message)
        {
            if (!ModelState.IsValid) return BadRequest();

            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();

            return Ok(message);
        }
    }
}
