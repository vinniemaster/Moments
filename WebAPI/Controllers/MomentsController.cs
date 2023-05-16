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
                    var comments = _context.TB_COMMENTS.Where(x => x.momentId == dado.id).ToList();
                    dado.comments = comments;
                    return new Response<TB_MOMENTS> { Message = "Momento Localizado!", Data = dado };
                }
                else
                {
                    return new Response<TB_MOMENTS> { Message = "Momento não encontrado :(" };
                }
            }
            catch (Exception ex)
            {
                exception = ex;
            }

            return new Response<TB_MOMENTS> { Message = $"Ocorreu um erro: {exception}" };
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
                    var momentExistent = _context.TB_MOMENTS.Find(momentdata.id);
                    if(momentExistent != null)
                    {
                        momentExistent.title = !string.IsNullOrEmpty(momentdata.title) ? momentdata.title : momentExistent.title;
                        momentExistent.description = !string.IsNullOrEmpty(momentdata.description) ? momentdata.description : momentExistent.description;
                        momentExistent.image = !string.IsNullOrEmpty(momentdata.image) ? momentdata.image : momentExistent.image;
                        momentExistent.updated_at = DateTime.Now;


                        _context.TB_MOMENTS.Update(momentExistent);
                        _context.SaveChanges();
                        return new Response<TB_MOMENTS> { Message = "Momento Atualizado com Sucesso!", Data = momentExistent };
                    }
                    else
                    {
                        return new Response<TB_MOMENTS> { Message = "Momento não encontrado!" };

                    }

                    
                }

            }
            catch(Exception e)
            {
                exception = e;
            }

            return new Response<TB_MOMENTS> { Message = $"Ocorreu um erro: {exception}" };
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

                    return new Response<TB_MOMENTS> { Message = "Momento excluído com sucesso!" };
                }
                else
                {
                    return new Response<TB_MOMENTS> { Message = "Momento não encontrado :(" };
                }
            }
            catch (Exception ex)
            {
                exception = ex;
            }

            return new Response<TB_MOMENTS> { Message = $"Ocorreu um erro: {exception}" };
        }


    }
}
