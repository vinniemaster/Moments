using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Moment
    {
        public int? id { get; set; }
        public string title { get; set; }

        public string description { get; set; }

        public string? image { get; set; }

        public DateTime? created_at { get; set; }
        public DateTime? updated_at { get; set; }

        [NotMapped]
        public string[]? comments { get; set; }
    }
}
