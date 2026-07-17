import { createContext, useContext, useEffect, useState } from "react";
import { getCartItems } from "../services/cartApi";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const loadCartCount = async () => {
    try {
      const items = await getCartItems();

      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

      setCartCount(totalItems);
    } catch (error) {
      console.error("Failed to load cart count:", error);
    }
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        loadCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
