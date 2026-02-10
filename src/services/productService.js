import api from "./api";

export const getAllProducts = async (limit = 10, skip = 0) => {
  const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};

export const addProduct = async (product) => {
  const response = await api.post("/products/add", product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
