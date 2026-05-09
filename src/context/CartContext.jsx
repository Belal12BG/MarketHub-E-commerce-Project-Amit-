import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getAllCarts } from "../services/cartService";

export const CartContext = createContext();

const getCartKey = () => {
  try {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      return `cart_${parsed.id}`;
    }
  } catch {
    return null;
  }
  return null;
};

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userCart, setUserCart] = useState(() => {
    try {
      const key = getCartKey();
      if (key) {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : { products: [] };
      }
    } catch {
      return { products: [] };
    }
    return { products: [] };
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const key = user ? `cart_${user.id}` : getCartKey();
    if (key) {
      localStorage.setItem(key, JSON.stringify(userCart));
    }
  }, [userCart, user]);

  // Clear cart on logout
  useEffect(() => {
    if (!user) {
      setUserCart({ products: [] });
    }
  }, [user]);

  const fetchAllCarts = async () => {
    setLoading(true);
    try {
      const data = await getAllCarts();
      setCarts(data.carts || []);
    } catch (error) {
      console.error("Failed to fetch carts:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setUserCart((prev) => {
      const existing = prev.products.find((p) => p.id === product.id);
      if (existing) {
        return {
          products: prev.products.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
          ),
        };
      }
      return {
        products: [
          ...prev.products,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
          },
        ],
      };
    });
  };

  const removeFromCart = (productId) => {
    setUserCart((prev) => ({
      products: prev.products.filter((p) => p.id !== productId),
    }));
  };

  const clearCart = () => setUserCart({ products: [] });

  const increaseQuantity = (productId) => {
    setUserCart((prev) => ({
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p,
      ),
    }));
  };

  const decreaseQuantity = (productId) => {
    setUserCart((prev) => ({
      products: prev.products
        .map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p,
        )
        .filter((p) => p.quantity > 0),
    }));
  };

  const calculateTotal = () =>
    userCart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

  return (
    <CartContext.Provider
      value={{
        userCart,
        carts,
        loading,
        fetchAllCarts,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
