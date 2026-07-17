import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <div className="logo">
        🛍 <span>ShopEase</span>
      </div>

      <nav className="nav-links">
        {/* <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink> */}

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Products
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          🛒 Cart
          <span className="cart-badge">{cartCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
