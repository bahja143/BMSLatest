using BMSystem.Modal;
using BMSystem.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/contracts")]
    public class ContractsController : Controller
    {
        private BMSDbContext _context { get; set; }

        public ContractsController(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult getCurrent()
        {
            return Ok(_context
                .Contractes
                .Where(c => c.IsCurrent && c.EndDate > DateTime.Now)
                .Include(r => r.Tenant)
                .Include(r => r.Room)
                .ToList()
                .OrderByDescending(c => c.Date));
        }

        [HttpGet("/api/contracts/all")]
        public ActionResult getAll()
        {
            return Ok(_context
                .Contractes
                .Include(r => r.Tenant)
                .Include(r => r.Room)
                .ToList()
                .OrderByDescending(c => c.Date));
        }

        [HttpGet("{id}")]
        public ActionResult getById(int Id)
        {
            return Ok(_context.Contractes.SingleOrDefault(r => r.Id == Id));
        }

        [HttpGet("/api/contracts/out/{id}")]
        public async Task<ActionResult> getOut(int Id)
        {
            var contractDb =
                await _context
                    .Contractes
                    .SingleOrDefaultAsync(r => r.Id == Id);

            contractDb.IsCurrent = false;
            await _context.SaveChangesAsync();

            return Ok(contractDb);
        }

        [HttpPost]
        public async Task<ActionResult> post([FromBody] Contract contract)
        {
            if (!ModelState.IsValid) return BadRequest();

            var contractDb =
                await _context
                    .Contractes
                    .SingleOrDefaultAsync(r =>
                        r.RoomId == contract.RoomId && r.IsCurrent && r.EndDate > DateTime.Now);

            if (contractDb != null)
                return BadRequest("This room is already rented!");

            var contractDbUpdate =
            await _context
               .Contractes
               .SingleOrDefaultAsync(r =>
                   r.RoomId == contract.RoomId && r.IsCurrent);

            contract.IsCurrent = true;
            contract.Date = DateTime.Now;
            await _context.Contractes.AddAsync(contract);
            await _context.SaveChangesAsync();

            var bill = new BillsController(_context);
            await bill.generateBills(contract.Id);

            return Ok(contract);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> put(int Id, [FromBody] Contract contract)
        {
            var contractDb = _context.Contractes.AsNoTracking().SingleOrDefault(r => r.Id == Id);

            if (contractDb == null) return NotFound("Not found");

            contract.IsCurrent = true;
            _context.Contractes.Update(contract);
            await _context.SaveChangesAsync();

            return Ok(contract);
        }
    }
}
