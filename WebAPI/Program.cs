using Microsoft.EntityFrameworkCore;
using WebAPI.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<DatabaseContext>
    (options => options.UseSqlServer("Data Source=SATAN-SERVER\\SQLEXPRESS;User ID=sa;Password=DNTSeziIS6I1mPLA1415;MultipleActiveResultSets=True; Initial Catalog=AngularFirstDB;Trust Server Certificate=true")); ;

builder.Services.AddCors(options =>
{
  options.AddPolicy("CorsPolicy", builder => builder
  .AllowAnyOrigin()
  .AllowAnyMethod()
  .AllowAnyHeader());
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
