using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class TB_PERFIL_VS_MODULO
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public int id_modulo { get; set; }
        
    }
}
