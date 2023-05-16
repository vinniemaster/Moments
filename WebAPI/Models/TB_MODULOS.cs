using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class TB_MODULOS
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string routerlink { get; set; }
    }
}
