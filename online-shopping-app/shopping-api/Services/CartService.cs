using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using shopping_api.Data;
using shopping_api.DTOs;
using shopping_api.Interfaces;
using shopping_api.Models;

namespace shopping_api.Services
{
    public class CartService : ICartService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CartService> _logger;

        public CartService(
            ApplicationDbContext context,
            ILogger<CartService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<CartItemDto> AddToCartAsync(AddToCartDto dto)
        {
            _logger.LogInformation(
                "Adding Product ID {ProductId} with Quantity {Quantity} to cart.",
                dto.ProductId,
                dto.Quantity);

            var product = await _context.Products.FindAsync(dto.ProductId);

            if (product == null)
            {
                _logger.LogWarning(
                    "Product with ID {ProductId} not found.",
                    dto.ProductId);

                throw new KeyNotFoundException(
                    $"Product with ID {dto.ProductId} was not found.");
            }

            var existingCartItem = await _context.CartItems
                .FirstOrDefaultAsync(c => c.ProductId == dto.ProductId);

            if (existingCartItem != null)
            {
                existingCartItem.Quantity += dto.Quantity;

                _logger.LogInformation(
                    "Updated quantity for Product ID {ProductId}. New Quantity: {Quantity}",
                    dto.ProductId,
                    existingCartItem.Quantity);
            }
            else
            {
                var cartItem = new CartItem
                {
                    ProductId = dto.ProductId,
                    Quantity = dto.Quantity
                };

                _context.CartItems.Add(cartItem);

                _logger.LogInformation(
                    "Added new Product ID {ProductId} to cart.",
                    dto.ProductId);
            }

            await _context.SaveChangesAsync();

            var updatedCartItem = await _context.CartItems
                .Include(c => c.Product)
                .FirstAsync(c => c.ProductId == dto.ProductId);

            return new CartItemDto
            {
                Id = updatedCartItem.Id,
                ProductId = updatedCartItem.ProductId,
                ProductName = updatedCartItem.Product.Name,
                Price = updatedCartItem.Product.Price,
                Quantity = updatedCartItem.Quantity,
                TotalPrice = updatedCartItem.Product.Price * updatedCartItem.Quantity
            };
        }

        public async Task<IEnumerable<CartItemDto>> GetCartItemsAsync()
        {
            _logger.LogInformation("Fetching all cart items.");

            var cartItems = await _context.CartItems
                .Include(c => c.Product)
                .ToListAsync();

            return cartItems.Select(c => new CartItemDto
            {
                Id = c.Id,
                ProductId = c.ProductId,
                ProductName = c.Product.Name,
                Price = c.Product.Price,
                Quantity = c.Quantity,
                TotalPrice = c.Product.Price * c.Quantity
            });
        }

        public async Task<CartItemDto?> UpdateQuantityAsync(int cartItemId, int quantity)
        {
            _logger.LogInformation(
                "Updating Cart Item ID {CartItemId} to Quantity {Quantity}.",
                cartItemId,
                quantity);

            var cartItem = await _context.CartItems
                .Include(c => c.Product)
                .FirstOrDefaultAsync(c => c.Id == cartItemId);

            if (cartItem == null)
            {
                _logger.LogWarning(
                    "Cart Item ID {CartItemId} not found.",
                    cartItemId);

                return null;
            }

            cartItem.Quantity = quantity;

            await _context.SaveChangesAsync();

            _logger.LogInformation(
                "Cart Item ID {CartItemId} updated successfully.",
                cartItemId);

            return new CartItemDto
            {
                Id = cartItem.Id,
                ProductId = cartItem.ProductId,
                ProductName = cartItem.Product.Name,
                Price = cartItem.Product.Price,
                Quantity = cartItem.Quantity,
                TotalPrice = cartItem.Product.Price * cartItem.Quantity
            };
        }

        public async Task<bool> RemoveFromCartAsync(int cartItemId)
        {
            _logger.LogInformation(
                "Removing Cart Item ID {CartItemId}.",
                cartItemId);

            var cartItem = await _context.CartItems.FindAsync(cartItemId);

            if (cartItem == null)
            {
                _logger.LogWarning(
                    "Cart Item ID {CartItemId} not found.",
                    cartItemId);

                return false;
            }

            _context.CartItems.Remove(cartItem);

            await _context.SaveChangesAsync();

            _logger.LogInformation(
                "Cart Item ID {CartItemId} removed successfully.",
                cartItemId);

            return true;
        }

        public async Task<bool> ClearCartAsync()
        {
            _logger.LogInformation("Clearing cart.");

            var cartItems = await _context.CartItems.ToListAsync();

            if (!cartItems.Any())
            {
                _logger.LogWarning("Cart is already empty.");
                return false;
            }

            _context.CartItems.RemoveRange(cartItems);

            await _context.SaveChangesAsync();

            _logger.LogInformation("Cart cleared successfully.");

            return true;
        }

        public async Task<PurchaseSummaryDto> GetPurchaseSummaryAsync()
        {
            _logger.LogInformation("Calculating purchase summary.");

            var cartItems = await _context.CartItems
                .Include(c => c.Product)
                .ToListAsync();

            decimal subTotal = cartItems.Sum(c => c.Product.Price * c.Quantity);

            decimal discount = 0;

            if (subTotal >= 5000)
            {
                discount = subTotal * 0.10m;
            }

            decimal grandTotal = subTotal - discount;

            _logger.LogInformation(
                "Purchase Summary - SubTotal: {SubTotal}, Discount: {Discount}, GrandTotal: {GrandTotal}",
                subTotal,
                discount,
                grandTotal);

            return new PurchaseSummaryDto
            {
                SubTotal = subTotal,
                Discount = discount,
                GrandTotal = grandTotal
            };
        }
    }
}