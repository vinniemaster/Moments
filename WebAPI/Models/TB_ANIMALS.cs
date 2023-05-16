using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
  public class TB_ANIMALS
  {
    [Key]
    public int id { get; set; }
    public string name { get; set; }
    public string type { get; set; }
    public int age { get; set; }
  }
}
