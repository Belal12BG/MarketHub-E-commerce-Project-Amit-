import api from "./api";

export const getAllCarts = async (limit = 20, skip = 0) => {
  const response = await api.get(`/carts?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const getCartById = async (id) => {
  const response = await api.get(`/carts/${id}`);
  return response.data;
};

export const getCartsByUser = async (userId) => {
  const response = await api.get(`/carts/user/${userId}`);
  return response.data;
};

export const addCart = async (cart) => {
  const response = await api.post("/carts/add", cart);
  return response.data;
};

export const updateCart = async (id, cart) => {
  const response = await api.put(`/carts/${id}`, cart);
  return response.data;
};

export const deleteCart = async (id) => {
  const response = await api.delete(`/carts/${id}`);
  return response.data;
};
