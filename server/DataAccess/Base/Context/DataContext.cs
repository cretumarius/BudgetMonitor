using DataAccess.Configurations;
using Domain.OCR;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace DataAccess.Base.Context
{
    public class DataContext : DbContext, IDataContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public new DatabaseFacade Database => base.Database;

        public void InitializeDatabase()
        {
        }

        public new void SaveChanges()
        {
            base.SaveChanges();
        }

        public new DbSet<TEntity> Set<TEntity>() where TEntity : class
        {
            return base.Set<TEntity>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new OcrResultConfiguration());

            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<OcrResult>().ToTable("OcrResults");
        }
    }
}
