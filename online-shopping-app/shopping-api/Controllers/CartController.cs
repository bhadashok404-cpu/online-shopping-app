using Microsoft.AspNetCore.Mvc;
using shopping_api.DTOs;
using shopping_api.Interfaces;

namespace shopping_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        // POST: api/cart/add
        [HttpPost("add")]
        public async Task<IActionResult> AddToCart(AddToCartDto dto)
        {
            var result = await _cartService.AddToCartAsync(dto);
            return Ok(result);
        }

        // GET: api/cart
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var result = await _cartService.GetCartItemsAsync();
            return Ok(result);
        }

        // PUT: api/cart/1?quantity=3
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuantity(int id, [FromQuery] int quantity)
        {
            var result = await _cartService.UpdateQuantityAsync(id, quantity);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // DELETE: api/cart/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            var deleted = await _cartService.RemoveFromCartAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }

        // DELETE: api/cart
        [HttpDelete]
        public async Task<IActionResult> ClearCart()
        {
            var cleared = await _cartService.ClearCartAsync();

            if (!cleared)
                return NotFound("Cart is already empty.");

            return NoContent();
        }

        // GET: api/cart/summary
        [HttpGet("summary")]
        public async Task<IActionResult> GetPurchaseSummary()
        {
            var summary = await _cartService.GetPurchaseSummaryAsync();
            return Ok(summary);
        }
    }
}