using AutoMapper;
using SocialMediaApp.AutoMapperProfile;
using SocialMediaApp.BLL.Interfaces;
using SocialMediaApp.DAL.Interfaces;
using SocialMediaApp.BLL.Services;
using SocialMediaApp.DAL;
using SocialMediaApp.DAL.Repositories;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

var config = new MapperConfiguration(cfg =>
{
    cfg.AddProfile(new AutoMapperProfile());
});
var mapper = config.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddDbContext<SocialMediaAppDBContext>(options => options.UseSqlServer("Data Source=.;Initial Catalog=SMA_DB;Integrated Security=True;MultipleActiveResultSets=True;TrustServerCertificate=True"));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
