import "./ProductCard.css";
import { addToCart } from "../../services/cartApi";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

function ProductCard({ product }) {
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
      <div className="product-image">💻</div>

      <h2>{product.name}</h2>

      <p className="description">{product.description}</p>

      <div className="price">₹ {product.price}</div>

      <div className="stock">Stock : {product.stock}</div>

      <button onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
}

export default ProductCard;
