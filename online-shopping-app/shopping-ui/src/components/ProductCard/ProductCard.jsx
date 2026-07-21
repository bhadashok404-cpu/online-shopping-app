import "./ProductCard.css";
import { addToCart } from "../../services/cartApi";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

function ProductCard({ product, onEdit, onDelete }) {
  const { loadCartCount } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product.id,
        quantity: 1,
      });

      await loadCartCount();

      toast.success(`${product.name} added to cart`);
    } catch (error) {
      console.error(error);
      toast.error("Unable to add product");
    }
  };

  return (
    <div className="product-card">
      <span className="product-badge">Featured</span>
      <div className="product-image">💻</div>

      <h2>{product.name}</h2>

      <p className="description">{product.description}</p>

      <div className="product-footer">
        <div>
          <div className="price">₹ {product.price}</div>
          <div className="stock">Stock : {product.stock}</div>
        </div>
      </div>

      <div className="product-actions">
        <button type="button" className="secondary-btn" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button type="button" className="danger-btn" onClick={() => onDelete(product.id)}>
          Delete
        </button>
      </div>

      <button type="button" onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
}

export default ProductCard;
