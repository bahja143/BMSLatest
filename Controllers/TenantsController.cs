using BMSystem.Modal;
using BMSystem.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/tenants")]
    public class TenantsController : Controller
    {
        private BMSDbContext _context { get; set; }

        public TenantsController(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context.Tenants.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .Tenants
                .SingleOrDefaultAsync(c => c.Id == Id));
        }

        [HttpPost]
        public async Task<ActionResult> post([FromBody] Tenant tenant)
        {
            if (!ModelState.IsValid) return BadRequest();

            var tenantDb =
               await _context.Tenants.SingleOrDefaultAsync(c => c.Name == tenant.Name || c.Telephone == tenant.Telephone);

            if (tenantDb != null) return BadRequest("This tenant already registered");

            await _context.Tenants.AddAsync(tenant);
            await _context.SaveChangesAsync();

            return Ok(tenant);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult>
        put(int Id, [FromBody] Tenant tenant)
        {
            var tenantDb =
                await _context.Tenants.AsNoTracking().SingleOrDefaultAsync(c => c.Id == Id);

            if (tenantDb == null) return NotFound();

            _context.Tenants.Update(tenant);
            await _context.SaveChangesAsync();

            return Ok(tenant);
        }
    }
}
