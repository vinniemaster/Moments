using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Context;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/Modules")]
    [ApiController]
    public class ModulesController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public ModulesController(DatabaseContext context) {  _context = context; }

        [HttpGet, Route("{perfil}")]
        public List<TB_MODULOS> Get(string perfil)
        {
            var module_vs_perfil = _context.TB_PERFIL_VS_MODULO.Where(x => x.name == perfil.ToUpper()).ToList();
            var dados = new List<TB_MODULOS>();

            foreach(var item in module_vs_perfil)
            {
                var modulo = _context.TB_MODULOS.Where(x => x.id == item.id_modulo).FirstOrDefault();
                dados.Add(modulo);
            }

            return dados;
        } 
    }
}
