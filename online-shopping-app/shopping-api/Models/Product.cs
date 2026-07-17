using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace shopping_api.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Precision(18, 2)]
        public decimal Price { get; set; }

        public string? Description { get; set; }

        public int Stock { get; set; }
    }
}