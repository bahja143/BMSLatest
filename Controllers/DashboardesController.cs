using BMSystem.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


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
            var Receipts = await _context.Receipts.Include(r => r.details).Select(r =>
            new
            {
                r.Id,
                r.Date,
                r.details,
                r.PayerName,
                r.Description,
                r.MethodOfPayment
            }).Take(7).ToListAsync();
            var paidBillsId = _context.ReceiptDetails.Select(r => r.BillId);
            var bills = await _context.Bills.Include(b => b.Contract)
                                            .Where(b => b.DueDate <= DateTime.Now)
                                            .ToListAsync();

            var outputData = bills.Select(b => new
            {
                b.Id,
                b.Date,
                b.DueDate,
                b.Description,
                TenantName = _context.Tenants.SingleOrDefault(t => t.Id == b.Contract.TenantId).Name,
                TenantAddress = _context.Tenants.SingleOrDefault(t => t.Id == b.Contract.TenantId).Address,
                Amount = b.Amount - _context.ReceiptDetails.Where(r => r.BillId == b.Id).Sum(b => b.Amount),
                TenantTelephone = _context.Tenants.SingleOrDefault(t => t.Id == b.Contract.TenantId).Telephone,
                Room = _context.Rooms.SingleOrDefault(r => r.Id == b.Contract.RoomId).RoomNumber + "-" + _context.Rooms.SingleOrDefault(r => r.Id == b.Contract.RoomId).FloorNo
            }).Where(b => b.Amount > 0);

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

            var TotalBills = outputData.Sum(b => b.Amount);
            var TotalReceipts = receipts.Select(r => new
            {
                totalAmount = r.Bills.Sum(b => b.Amount),

            }).Sum(r => r.totalAmount);
            var TotalExpenses = _context.Expenses.Sum(e => e.Amount);
            var TotalContracts = _context
                .Contractes
                .Where(c => c.IsCurrent && c.EndDate > DateTime.Now).Count();
            var Bills = bills.Select(b => new { X = b.DueDate, Y = b.Amount }).ToList();

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
