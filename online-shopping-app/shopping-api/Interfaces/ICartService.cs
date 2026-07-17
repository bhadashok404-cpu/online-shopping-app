using shopping_api.DTOs;

namespace shopping_api.Interfaces
{
    public interface ICartService
    {
        Task<CartItemDto> AddToCartAsync(AddToCartDto dto);

        Task<IEnumerable<CartItemDto>> GetCartItemsAsync();

        Task<bool> RemoveFromCartAsync(int cartItemId);

        Task<bool> ClearCartAsync();

        Task<PurchaseSummaryDto> GetPurchaseSummaryAsync();

        Task<CartItemDto?> UpdateQuantityAsync(int cartItemId, int quantity);
    }
}