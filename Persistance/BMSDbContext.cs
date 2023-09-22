using BMSystem.Modal;
using Microsoft.EntityFrameworkCore;

namespace BMSystem.Persistance
{
    public class BMSDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Receipt> Receipts { get; set; }

        public DbSet<ReceiptDetail> ReceiptDetails { get; set; }

        public DbSet<Bill> Bills { get; set; }

        public DbSet<ExpenseCategory> ExpenseCategories { get; set; }

        public DbSet<Expense> Expenses { get; set; }

        public DbSet<Contract> Contractes { get; set; }

        public DbSet<Building> Buildinges { get; set; }

        public DbSet<Room> Rooms { get; set; }

        public DbSet<Tenant> Tenants { get; set; }

        public DbSet<Message> Messages { get; set; }

        public DbSet<MessageDetail> MessageDetails { get; set; }

        public DbSet<ReceiptTrash> ReceiptTrashes { get; set; }

        public DbSet<ReceiptDetailTrash> ReceiptDetailTrashes { get; set; }

        public BMSDbContext(DbContextOptions<BMSDbContext> options) :
            base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
    }
}
