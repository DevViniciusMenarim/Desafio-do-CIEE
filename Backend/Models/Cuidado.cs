using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Cuidado
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string NomeCuidado { get; set; }

        public string Descricao { get; set; }

        [Required]
        public string Frequencia { get; set; }
    }
}