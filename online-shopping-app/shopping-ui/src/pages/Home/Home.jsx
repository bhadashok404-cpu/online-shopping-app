import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1 className="page-title">🛍 Latest Products</h1>

      {products.length === 0 ? (
        <h3>No products available.</h3>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;