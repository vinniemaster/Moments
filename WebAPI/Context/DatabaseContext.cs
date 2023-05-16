using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Context
{
  public class DatabaseContext : DbContext
  {
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }
    public DbSet<TB_MOMENTS> TB_MOMENTS { get; set; }
    public DbSet<TB_MODULOS> TB_MODULOS { get; set; }
    public DbSet<TB_COMMENTS> TB_COMMENTS { get; set; }
    public DbSet<TB_PERFIL_VS_MODULO> TB_PERFIL_VS_MODULO { get; set; }
    }
}
