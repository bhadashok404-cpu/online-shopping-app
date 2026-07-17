using shopping_api.Models;

namespace shopping_api.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();

        Task<Product?> GetByIdAsync(int id);

        Task<Product> AddAsync(Product product);

        Task<Product?> UpdateAsync(Product product);

        Task<bool> DeleteAsync(int id);
    }
}