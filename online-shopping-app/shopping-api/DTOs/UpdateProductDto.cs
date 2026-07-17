using System.ComponentModel.DataAnnotations;

namespace shopping_api.DTOs
{
    public class UpdateProductDto
    {
        [Required]
        public int Id { get; set; }

        [Required(ErrorMessage = "Product name is required.")]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Range(1, 10000000)]
        public decimal Price { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [Range(0, 100000)]
        public int Stock { get; set; }
    }
}