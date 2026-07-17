using System.ComponentModel.DataAnnotations;

namespace shopping_api.DTOs
{
    public class AddToCartDto
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int ProductId { get; set; }

        [Required]
        [Range(1, 100)]
        public int Quantity { get; set; }
    }
}