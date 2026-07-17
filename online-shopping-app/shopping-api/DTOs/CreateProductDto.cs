using System.ComponentModel.DataAnnotations;

namespace shopping_api.DTOs
{
    public class CreateProductDto
    {
        [Required(ErrorMessage = "Product name is required.")]
        [StringLength(100, ErrorMessage = "Product name cannot exceed 100 characters.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Price is required.")]
        [Range(1, 10000000, ErrorMessage = "Price must be greater than zero.")]
        public decimal Price { get; set; }

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        [Range(0, 100000, ErrorMessage = "Stock cannot be negative.")]
        public int Stock { get; set; }
    }
}