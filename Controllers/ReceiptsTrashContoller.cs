using BMSystem.Modal;
using BMSystem.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/receiptstrash")]
    public class ReceiptsTrashContoller : Controller
    {
        private BMSDbContext _context { get; set; }

        public ReceiptsTrashContoller(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult getAll()
        {
            try
            {
                var receipts = _context
                   .ReceiptTrashes
                   .Include(r => r.details)
                   .ToList()
                   .Select(r => new
                   {
                       r.Id,
                       r.Date,
                       r.details,
                       r.PayerName,
                       r.Description,
                       r.MethodOfPayment,
                       TenantId = _context.Bills.Include(B => B.Contract)
                                                  .Where(b => r.details.Select(d => d.BillId)
                                                  .Contains(b.Id))
                                                  .ToList()[0].Contract.TenantId,
                       Bills = _context.Bills.Where(b => r.details.Select(d => d.BillId)
                                             .Contains(b.Id))
                                             .Select(b => new
                                             {
                                                 b.Id,
                                                 b.Date,
                                                 b.Amount,
                                                 b.DueDate,
                                                 b.Description,
                                                 PaidAmount = _context.ReceiptDetailTrashes.SingleOrDefault(r => r.BillId == b.Id).Amount,
                                             }).ToList()

                   })
                   .ToList();

                return Ok(receipts.Select(r => new
                {
                    r.Id,
                    r.Date,
                    r.Bills,
                    r.PayerName,
                    r.Description,
                    totalAmount = r.details.Sum(r => r.Amount),
                    PaymentMethod = r.MethodOfPayment,
                    Name = _context.Tenants.SingleOrDefault(t => t.Id == r.TenantId).Name,
                    Tenant = _context.Tenants.Where(t => t.Id == r.TenantId)
                                             .Select(t => new
                                             {
                                                 t.Id,
                                                 t.Name,
                                                 t.Address,
                                                 t.Telephone,
                                             }).ToList()[0]
                }));
            }
            catch (System.Exception error)
            {

                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            var receipts = await _context
               .ReceiptTrashes
               .Include(r => r.details)
               .Select(r => new
               {
                   r.Id,
                   r.Date,
                   r.details,
                   r.PayerName,
                   r.Description,
                   r.MethodOfPayment,
                   TenantId = _context.Bills.Include(B => B.Contract)
                                            .Where(b => r.details.Select(d => d.BillId)
                                            .Contains(b.Id))
                                            .ToList()[0].Contract.TenantId,
                   Bills = _context.Bills.Where(b => r.details.Select(d => d.BillId)
                                         .Contains(b.Id))
                                         .Select(b => new
                                         {
                                             b.Id,
                                             b.Date,
                                             b.Amount,
                                             b.DueDate,
                                             b.Description,
                                             PaidAmount = _context.ReceiptDetailTrashes.SingleOrDefault(r => r.BillId == b.Id).Amount,
                                         }).ToList()

               })
               .Where(r => r.Id == Id)
               .ToListAsync();

            return Ok(receipts.Select(r => new
            {
                r.Id,
                r.Date,
                r.Bills,
                r.TenantId,
                r.PayerName,
                r.Description,
                PaymentMethod = r.MethodOfPayment,
                Name = _context.Tenants.SingleOrDefault(t => t.Id == r.TenantId).Name,
            }).ToList()[0]);
        }

        [HttpPost]
        public async Task<ActionResult> post([FromBody] ReceiptTrash receipt)
        {
            if (!ModelState.IsValid) return BadRequest();

            receipt.Date = DateTime.Now;
            await _context.ReceiptTrashes.AddAsync(receipt);
            await _context.SaveChangesAsync();

            var billsDb = await new BillsController(_context).getAll();

            return Ok(billsDb);
        }

    }
}
