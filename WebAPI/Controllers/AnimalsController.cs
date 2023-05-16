using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebAPI.Context;
using WebAPI.Models;

namespace WebAPI.Controllers
{
  [Route("api/Animals")]
  [ApiController]
  [EnableCors(origins: "*", headers: "*", methods: "get,post")]
  public class AnimalsController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public AnimalsController(DatabaseContext context)
    {
      _context = context;
    }
    [HttpGet]
    public IEnumerable<TB_ANIMALS> Get()
    {
      return _context.TB_ANIMALS;
    }
    [HttpGet, Route("{id}")]
    public TB_ANIMALS GetByID(int id)
    {
      return _context.TB_ANIMALS.Find(id);
    }
    [HttpDelete, Route("{id}")]
    public string Delete(int id)
    {
      var dado = _context.TB_ANIMALS.Find(id);
      if(dado != null)
      {
        _context.TB_ANIMALS.Remove(dado);
        _context.SaveChanges();
        return "Animal deletado com sucesso!";
      }
      return "Animal não encontrado!";
    }
  }
}
