using BMSystem.Modal;
using BMSystem.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace BMSystem.Controllers
{
    [Authorize]
    [Route("/api/bills")]
    public class BillsController : Controller
    {
        private BMSDbContext _context { get; set; }

        public BillsController(BMSDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getOverDueBills()
        {
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
                TenantTelephone = _context.Tenants.SingleOrDefault(t => t.Id == b.Contract.TenantId).Telephone,
                TenantAddress = _context.Tenants.SingleOrDefault(t => t.Id == b.Contract.TenantId).Address,
                Amount = b.Amount - _context.ReceiptDetails.Where(r => r.BillId == b.Id).Sum(b => b.Amount),
                Room = _context.Rooms.SingleOrDefault(r => r.Id == b.Contract.RoomId).RoomNumber + "-" + _context.Rooms.SingleOrDefault(r => r.Id == b.Contract.RoomId).FloorNo
            }).Where(b => b.Amount > 0);

            return Ok(outputData);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            var paidBillsId = _context.ReceiptDetails.Select(r => r.BillId);
            var bills = await _context.Bills.Include(b => b.Contract)
                                            .ToListAsync();

            var outputData = bills.Select(b => new
            {
                b.Id,
                b.Date,
                b.DueDate,
                b.Description,
                TenantId = _context.Tenants.SingleOrDefault(t => t.Id == b.Contract.TenantId).Id,
                TenantName = _context.Tenants.SingleOrDefault(t => t.Id == b.Contract.TenantId).Name,
                Amount = b.Amount - _context.ReceiptDetails.Where(r => r.BillId == b.Id).Sum(b => b.Amount),
                Room = _context.Rooms.SingleOrDefault(r => r.Id == b.Contract.RoomId).RoomNumber + "-" + _context.Rooms.SingleOrDefault(r => r.Id == b.Contract.RoomId).FloorNo
            }).Where(b => b.Amount > 0);

            return Ok(outputData.Where(t => t.TenantId == Id));
        }

        [HttpGet("/api/bills/allBills")]
        public async Task<ActionResult> getAll()
        {
            var paidBillsId = _context.ReceiptDetails.Select(r => r.BillId);
            var bills = await _context.Bills.Include(b => b.Contract)
                                            .ToListAsync();

            var outputData = bills.Select(b => new
            {
                b.Id,
                b.Date,
                b.DueDate,
                b.ContractId,
                b.Description,
                b.Contract.TenantId,
                TenantName = _context.Tenants.SingleOrDefault(t => t.Id == b.Contract.TenantId).Name,
                Amount = b.Amount - _context.ReceiptDetails.Where(r => r.BillId == b.Id).Sum(b => b.Amount),
                Room = _context.Rooms.SingleOrDefault(r => r.Id == b.Contract.RoomId).RoomNumber + "-" + _context.Rooms.SingleOrDefault(r => r.Id == b.Contract.RoomId).FloorNo
            }).Where(b => b.Amount > 0);

            return Ok(outputData);
        }

        [HttpPost]
        public async Task<ActionResult> generateBills(int Id)
        {
            var contracts = await _context.Contractes.Where(c => c.IsCurrent && c.EndDate > DateTime.Now)
                                                     .Where(c => c.Id == Id)
                                                     .Select((c) => new
                                                     {
                                                         c.Id,
                                                         c.EndDate,
                                                         c.StartDate,
                                                         c.AmountPerSq,
                                                         c.Room.RoomSizeInSq,
                                                         DurationInMonths = Math.Round(c.EndDate.Subtract(c.StartDate).TotalDays / 30),
                                                     })
                                                     .ToListAsync();
            var bills = new List<Bill>();

            foreach (var contract in contracts)
            {
                var bill = _context.Bills.FirstOrDefault(b => b.ContractId == contract.Id);

                if (bill != null) continue;

                for (int i = 0; i < contract.DurationInMonths; i++)
                {
                    bills.Add(new Bill
                    {
                        Id = 0,
                        Date = DateTime.Now,
                        ContractId = contract.Id,
                        Description = "1 Month Rent",
                        Amount = contract.AmountPerSq * contract.RoomSizeInSq,
                        DueDate = contract.StartDate.AddDays(1).AddMonths(i),
                    });

                }
            }

            await _context.Bills.AddRangeAsync(bills);
            await _context.SaveChangesAsync();

            var billsDb = await _context.Bills.ToListAsync();
            var outputData = billsDb.GroupBy(b => b.ContractId).Select(c => new { ContractId = c.Key, Bills = c });

            return Ok(outputData);
        }
    }
}
