import axios from "axios";
import API_BASE_URL from "../constants/api";

const cartApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add item to cart
export const addToCart = async (cartItem) => {
  const response = await cartApi.post("/Cart/add", cartItem);
  return response.data;
};

// Get all cart items
export const getCartItems = async () => {
  const response = await cartApi.get("/Cart");
  return response.data;
};

// Purchase Summary
export const getPurchaseSummary = async () => {
  const response = await cartApi.get("/Cart/summary");
  return response.data;
};

// Update quantity
export const updateCartQuantity = async (id, quantity) => {
  const response = await cartApi.put(`/Cart/${id}?quantity=${quantity}`);
  return response.data;
};

// Remove item
export const removeCartItem = async (id) => {
  await cartApi.delete(`/Cart/${id}`);
};

// Clear entire cart
export const clearCart = async () => {
  await cartApi.delete("/Cart");
};

export default cartApi;
