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

export default productApi;