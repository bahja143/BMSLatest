using BMSystem.Modal;
using BMSystem.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/expenses")]
    public class ExpensesController : Controller
    {
        private BMSDbContext _context { get; set; }

        public ExpensesController(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context.Expenses.Include(e => e.ExpenseCategory)
                                             .Select(e => new
                                             {
                                                 e.Id,
                                                 e.Date,
                                                 e.Amount,
                                                 e.Description,
                                                 e.ExpenseCategory,
                                                 e.ExpenseCategoryId,
                                                 name = e.ExpenseCategory.Name
                                             }).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .Expenses
                .SingleOrDefaultAsync(c => c.Id == Id));
        }

        [HttpPost]
        public async Task<ActionResult> post([FromBody] Expense expense)
        {
            if (!ModelState.IsValid) return BadRequest();

            expense.Date = DateTime.Now;
            await _context.Expenses.AddAsync(expense);
            await _context.SaveChangesAsync();

            return Ok(expense);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> put(int Id, [FromBody] Expense expense)
        {
            var expenseDb =
                await _context.Expenses.AsNoTracking().SingleOrDefaultAsync(c => c.Id == Id);

            if (expenseDb == null) return NotFound();

            _context.Expenses.Update(expenseDb);
            await _context.SaveChangesAsync();

            return Ok(expenseDb);
        }
    }
}
