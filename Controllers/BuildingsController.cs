using BMSystem.Modal;
using BMSystem.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/buildings")]
    public class BuildingsController : Controller
    {
        private BMSDbContext _context { get; set; }

        public BuildingsController(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context.Buildinges.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .Buildinges
                .SingleOrDefaultAsync(c => c.Id == Id));
        }

        [HttpPost]
        public async Task<ActionResult> post([FromBody] Building building)
        {
            if (!ModelState.IsValid) return BadRequest();

            var buildingDb =
              await _context.Buildinges.AsNoTracking().SingleOrDefaultAsync(c => c.Name == building.Name);

            if (buildingDb != null) return BadRequest("This building already registered");

            await _context.Buildinges.AddAsync(building);
            await _context.SaveChangesAsync();

            return Ok(building);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> put(int Id, [FromBody] Building building)
        {
            var buildingDb =
                await _context.Buildinges.AsNoTracking().SingleOrDefaultAsync(c => c.Id == Id);

            if (buildingDb == null) return NotFound();

            _context.Buildinges.Update(building);
            await _context.SaveChangesAsync();

            return Ok(building);
        }
    }
}
