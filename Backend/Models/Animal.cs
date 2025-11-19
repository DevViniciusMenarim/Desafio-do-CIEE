using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Animal
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório")]
        [StringLength(100)]
        public string Nome { get; set; }

        [StringLength(500)]
        public string Descricao { get; set; }

        [Required]
        public DateTime DataNascimento { get; set; }

        [Required]
        public string Especie { get; set; }

        [Required]
        public string Habitat { get; set; }

        [Required]
        public string PaisOrigem { get; set; }
    }
}