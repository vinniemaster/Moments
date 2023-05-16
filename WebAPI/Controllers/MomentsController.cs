using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Context;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/Moments")]
    [ApiController]
    public class MomentsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public MomentsController(DatabaseContext context) {  _context = context; }

        [HttpGet]
        public IEnumerable<TB_MOMENTS> Get()
        {
            return _context.TB_MOMENTS;
        }

        [HttpGet, Route("{id}")]
        public Response<TB_MOMENTS> GetByID(int id)
        {
            var exception = new Exception();
            try
            {
                var dado = _context.TB_MOMENTS.Find(id);
                if (dado != null) 
                {
                    return new Response<TB_MOMENTS> { Message = "Momento Localizado!", Data = dado };
                }
                else
                {
                    return new Response<TB_MOMENTS> { Message = "Momento não encontrado :(", Data = new TB_MOMENTS() };
                }
            }
            catch (Exception ex)
            {
                exception = ex;
            }

            return new Response<TB_MOMENTS> { Message = $"Ocorreu um erro: {exception}", Data = new TB_MOMENTS() };
        }

        [HttpPost]
        public Response<TB_MOMENTS> Post([FromBody] Response<Moment> moment)
        {
            var exception = new Exception();
            try {
                var momentdata = moment.Data;

                if (momentdata != null && momentdata.id == 0)
                {

                    var newmoment = new TB_MOMENTS
                    {
                        title = momentdata.title,
                        description = momentdata.description,
                        image = momentdata?.image,
                        created_at = DateTime.Now,
                        updated_at = DateTime.Now
                    };
                    _context.TB_MOMENTS.Add(newmoment);
                    _context.SaveChanges();

                    return new Response<TB_MOMENTS> { Message = "Momento Criado com Sucesso!", Data = newmoment };
                }
                else if (momentdata != null && momentdata.id != 0)
                {
                    var newmoment = new TB_MOMENTS
                    {
                        id = (int)momentdata.id,
                        title = momentdata.title,
                        description = momentdata.description,
                        image = momentdata?.image,
                        created_at = (DateTime)momentdata.created_at,
                        updated_at = DateTime.Now
                    };
                    _context.TB_MOMENTS.Add(newmoment);
                    _context.SaveChanges();

                    return new Response<TB_MOMENTS> { Message = "Momento Atualizado com Sucesso!", Data = newmoment };
                }

            }
            catch(Exception e)
            {
                exception = e;
            }

            return new Response<TB_MOMENTS> { Message = $"Ocorreu um erro: {exception}", Data = new TB_MOMENTS() };
        }

        [HttpDelete, Route("{id}")]
        public Response<TB_MOMENTS> Delete(int id)
        {
            var exception = new Exception();
            try
            {
                var dado = _context.TB_MOMENTS.Find(id);
                if (dado != null)
                {
                    _context.TB_MOMENTS.Remove(dado);
                    _context.SaveChanges();

                    return new Response<TB_MOMENTS> { Message = "Momento excluído com sucesso!", Data = new TB_MOMENTS() };
                }
                else
                {
                    return new Response<TB_MOMENTS> { Message = "Momento não encontrado :(", Data = new TB_MOMENTS() };
                }
            }
            catch (Exception ex)
            {
                exception = ex;
            }

            return new Response<TB_MOMENTS> { Message = $"Ocorreu um erro: {exception}", Data = new TB_MOMENTS() };
        }


    }
}
