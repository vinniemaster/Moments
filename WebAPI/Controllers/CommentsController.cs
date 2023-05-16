using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using WebAPI.Context;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/moments/comments")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public CommentsController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet, Route("{id}")]
        public List<TB_COMMENTS> Get(int momentid)
        {
            return _context.TB_COMMENTS.Where(x => x.momentId == momentid).ToList();  
        }

        [HttpPost]
        public Response<TB_COMMENTS> Post(Comments Comment)
        {
            var exception = new Exception();
            try
            {
                var Moment = _context.TB_MOMENTS.Find(Comment.momentId);
                if(Comment != null && Moment != null) {
                    var newcomment = new TB_COMMENTS()
                    {
                        text = Comment.text,
                        username = Comment.username,
                        momentId = Comment.momentId,
                        created_at = DateTime.Now,
                        updated_at = DateTime.Now
                    };

                    _context.TB_COMMENTS.Add(newcomment);
                    _context.SaveChanges();

                    return new Response<TB_COMMENTS>() { Message = $"Comentário efetuado com sucesso!", Data = newcomment };

                }
            }
            catch (Exception ex)
            {
                exception = ex;
            }
            return new Response<TB_COMMENTS>() { Message = $"Ocorreu um erro: {exception}" };
        }
    }
}
