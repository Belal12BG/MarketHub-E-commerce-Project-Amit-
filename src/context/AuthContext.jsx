import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, getAuthUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const userData = await getAuthUser(token);
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      localStorage.setItem("token", data.token);
      setUser(data);
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
