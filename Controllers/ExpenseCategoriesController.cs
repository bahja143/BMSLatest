using BMSystem.Modal;
using BMSystem.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/expensecategories")]
    public class ExpenseCategoriesController : Controller
    {
        private BMSDbContext _context { get; set; }

        public ExpenseCategoriesController(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context.ExpenseCategories.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .ExpenseCategories
                .SingleOrDefaultAsync(c => c.Id == Id));
        }

        [HttpPost]
        public async Task<ActionResult> post([FromBody] ExpenseCategory category)
        {
            if (!ModelState.IsValid) return BadRequest();

            var categorygDb =
             await _context.ExpenseCategories.AsNoTracking().SingleOrDefaultAsync(c => c.Name == category.Name);

            if (categorygDb != null) return BadRequest("This category already registered");

            await _context.ExpenseCategories.AddAsync(category);
            await _context.SaveChangesAsync();

            return Ok(category);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> put(int Id, [FromBody] ExpenseCategory category)
        {
            var categoryDb =
                await _context.ExpenseCategories.AsNoTracking().SingleOrDefaultAsync(c => c.Id == Id);

            if (categoryDb == null) return NotFound();

            _context.ExpenseCategories.Update(category);
            await _context.SaveChangesAsync();

            return Ok(category);
        }
    }
}
