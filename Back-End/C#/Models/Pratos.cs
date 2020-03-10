using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace Api.Models
{
    [Table("Pratos")]
    public class Pratos
    {
        [Key]
        public int Id {get; set;}
        public string NomeDoPrato{get; set;}  
        public float Preco {get; set;}  

    }
}