using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class TB_COMMENTS
    {
        [Key]
        public int id { get; set; }
        public string text { get; set; }
        public string username { get; set; }
        public int momentId { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}
