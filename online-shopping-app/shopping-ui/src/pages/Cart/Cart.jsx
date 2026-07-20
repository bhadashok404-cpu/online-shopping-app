import { useEffect, useState } from "react";
import "./Cart.css";
import "../../components/CartItem/CartItem.css";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";

import PurchaseSummary from "../../components/PurchaseSummary/PurchaseSummary";

import {
  getCartItems,
  updateCartQuantity,
  removeCartItem,
  clearCart,
  getPurchaseSummary,
} from "../../services/cartApi";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const { loadCartCount } = useCart();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCartItems();
      setCartItems(data);

      const purchaseSummary = await getPurchaseSummary();
      setSummary(purchaseSummary);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = async (item) => {
    try {
      await updateCartQuantity(item.id, item.quantity + 1);

      await loadCart();
      await loadCartCount();

      toast.success("Quantity updated");
    } catch (error) {
      console.error(error);
      toast.error("Unable to update quantity");
    }
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity === 1) return;

    try {
      await updateCartQuantity(item.id, item.quantity - 1);

      await loadCart();
      await loadCartCount();

      toast.info("Quantity updated");
    } catch (error) {
      console.error(error);
      toast.error("Unable to update quantity");
    }
  };

  const removeItem = async (id) => {
    try {
      await removeCartItem(id);

      await loadCart();
      await loadCartCount();

      toast.error("Product removed from cart");
    } catch (error) {
      console.error(error);
      toast.error("Unable to remove product");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();

      await loadCart();

      await loadCartCount();

      toast.success("🧹 Cart cleared successfully");
    } catch (error) {
      console.error(error);

      toast.error("Unable to clear cart");
    }
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading Cart...</h2>;
  }

  return (
    <div className="cart-page">
      {/* Left Section */}
      <div className="cart-content">
        <div className="cart-header">
          <div>
            <p className="cart-eyebrow">Your bag</p>
            <h1>Shopping Cart</h1>
          </div>

          {cartItems.length > 0 && (
            <button className="clear-cart-btn" onClick={handleClearCart}>
              🧹 Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-state">
            <h3>Your cart is empty.</h3>
            <p>Add a few favorites and they’ll appear here.</p>
          </div>
        ) : (
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item-card" key={item.id}>
                <div className="cart-item-main">
                  <div className="cart-item-info">
                    <span className="cart-item-badge">In your cart</span>
                    <h2>{item.productName}</h2>

                    <div className="cart-item-meta">
                      <p>
                        <strong>Price:</strong> ₹ {item.price}
                      </p>
                      <p>
                        <strong>Total:</strong> ₹ {item.totalPrice}
                      </p>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => decreaseQuantity(item)}
                      >
                        -
                      </button>

                      <span className="quantity-value">{item.quantity}</span>

                      <button
                        className="quantity-btn"
                        onClick={() => increaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>

                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      🗑 Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      {summary && <PurchaseSummary summary={summary} />}
    </div>
  );
}

export default Cart;
