import { useEffect, useState } from "react";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../../services/productApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductFormModal from "../../components/ProductFormModal/ProductFormModal";
import { toast } from "react-toastify";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSubmit = async (payload) => {
    try {
      setIsSubmitting(true);

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, payload);
        toast.success("Product updated successfully");
      } else {
        await createProduct(payload);
        toast.success("Product created successfully");
      }

      await loadProducts();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Unable to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Do you want to delete this product?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully");
      await loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Unable to delete product");
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
      <div className="home-body">
        <div className="home-header">
          <div>
            <p className="section-kicker">Shop inventory</p>
            <h1 className="page-title">🛍 Latest Products</h1>
          </div>
          <button type="button" className="add-product-btn" onClick={handleOpenCreateModal}>
            + Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <h3>No products available.</h3>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onEdit={handleOpenEditModal} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={selectedProduct}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default Home;