using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace Api.Models
{
    [Table("Restaurantes")]
    public class Restaurantes
    {
        [Key]
        
        public int Id {get; set;}
        public string NomeDoRestaurante{get; set;}        
    }
}