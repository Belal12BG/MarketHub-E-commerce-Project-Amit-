import api from "./api";

export const loginUser = async ({ username, password }) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/users/add", userData);
  return response.data;
};

export const getAuthUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
