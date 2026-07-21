import axios from "axios";
import API_BASE_URL from "../constants/api";

const productApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllProducts = async () => {
    const response = await productApi.get("/Product");
    return response.data;
};

export const getProductById = async (id) => {
    const response = await productApi.get(`/Product/${id}`);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await productApi.post("/Product", productData);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await productApi.put(`/Product/${id}`, { id, ...productData });
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await productApi.delete(`/Product/${id}`);
    return response.data;
};

export default productApi;