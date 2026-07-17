import { useEffect, useState } from "react";
import "./Cart.css";
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
    <div
      className="cart-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "40px",
      }}
    >
      {/* Left Section */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h1>Shopping Cart</h1>

          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                padding: "12px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              🧹 Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <h3>Your cart is empty.</h3>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <h2>{item.productName}</h2>

              <p>
                <strong>Price:</strong> ₹ {item.price}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  margin: "15px 0",
                }}
              >
                <button onClick={() => decreaseQuantity(item)}>-</button>

                <strong>{item.quantity}</strong>

                <button onClick={() => increaseQuantity(item)}>+</button>
              </div>

              <p>
                <strong>Total:</strong> ₹ {item.totalPrice}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  marginTop: "15px",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                🗑 Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Right Section */}
      {summary && <PurchaseSummary summary={summary} />}
    </div>
  );
}

export default Cart;
