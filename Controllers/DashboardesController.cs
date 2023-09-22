using BMSystem.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/dashboardes")]
    public class DashboardesController : Controller
    {
        private BMSDbContext _context { get; set; }

        public DashboardesController(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            var paidBillsId = _context.ReceiptDetails.Select(r => r.BillId).ToList();
            var bills = await _context.Bills.Where(b => !paidBillsId.Contains(b.Id))
                                            .ToListAsync();

            var receipts = await _context
               .Receipts
               .Include(r => r.details)
               .Select(r => new
               {
                   r.Id,
                   r.Date,
                   r.PayerName,
                   r.Description,
                   r.MethodOfPayment,
                   TenantId = _context.Bills.Include(B => B.Contract)
                                            .Where(b => r.details.Select(d => d.BillId)
                                            .Contains(b.Id))
                                            .ToList()[0].Contract.TenantId,
                   Bills = _context.Bills.Where(b => r.details.Select(d => d.BillId)
                                         .Contains(b.Id)).Select(b => new { b.Id, b.Amount, b.Date, b.Description, b.DueDate }).ToList()

               })
               .ToListAsync();

            var TotalBills = bills.Sum(b => b.Amount);
            var TotalReceipts = receipts.Select(r => new
            {
                totalAmount = r.Bills.Sum(b => b.Amount),

            }).Sum(r => r.totalAmount);
            var TotalExpenses = _context.Expenses.Sum(e => e.Amount);
            var TotalContracts = _context
                .Contractes
                .Where(c => c.IsCurrent && c.EndDate > DateTime.Now).Count();
            var Bills = bills.Select(b => new { X = b.DueDate, Y = b.Amount }).ToList();
            var Receipts = receipts.Select(r => new
            {
                date = r.Date,
                amount = r.Bills.Sum(b => b.Amount),

            }).Select(r => new { X = r.date, Y = r.amount }).ToList();


            var output = new
            {
                Receipts,
                TotalBills,
                TotalReceipts,
                TotalExpenses,
                TotalContracts,
            };

            return Ok(output);
        }
    }
}
