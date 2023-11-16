using BMSystem.Modal;
using BMSystem.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/receipts")]
    public class ReceiptsController : Controller
    {
        private BMSDbContext _context { get; set; }

        public ReceiptsController(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult getAll()
        {

            var receipts = _context
               .Receipts
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
                                             PaidAmount = _context.ReceiptDetails.SingleOrDefault(rd => rd.BillId == b.Id && rd.ReceiptId == r.Id).Amount,
                                         }).ToList()

               })
               .OrderByDescending(r => r.Date)
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

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            var receipts = await _context
               .Receipts
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
                                             PaidAmount = _context.ReceiptDetails.SingleOrDefault(r => r.BillId == b.Id).Amount,
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
        public async Task<ActionResult> post([FromBody] Receipt receipt)
        {
            if (!ModelState.IsValid) return BadRequest();

            receipt.Date = DateTime.Now;
            await _context.Receipts.AddAsync(receipt);
            await _context.SaveChangesAsync();

            var receiptsDb = await getById(receipt.Id);

            return Ok(receiptsDb);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> put(int Id)
        {
            var ReceiptsDb = await _context.Receipts.Include(r => r.details)
                                                   .SingleOrDefaultAsync(r => r.Id == Id);
            var ReceiptTrash = new ReceiptTrash
            {
                Id = 0,
                Date = ReceiptsDb.Date,
                details = ReceiptsDb.details.Select(d =>
                new ReceiptDetailTrash
                {
                    Id = 0,
                    BillId = d.BillId,
                    Amount = d.Amount,
                    ReceiptTrashId = 0,
                }).ToList(),
                DeletedDate = DateTime.Now,
                PayerName = ReceiptsDb.PayerName,
                Description = ReceiptsDb.Description,
                MethodOfPayment = ReceiptsDb.MethodOfPayment,
            };
            var Trash = new ReceiptsTrashContoller(_context);

            _context.Receipts.Remove(ReceiptsDb);
            await Trash.post(ReceiptTrash);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
