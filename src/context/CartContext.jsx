import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [userCart, setUserCart] = useState({ products: [] });

  // 🔹 load cart from localStorage
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      setUserCart(savedCart ? JSON.parse(savedCart) : { products: [] });
    } else {
      setUserCart({ products: [] });
    }
  }, [user]);

  // 🔹 save cart
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(userCart));
    }
  }, [userCart, user]);

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

  const clearCart = () => {
    setUserCart({ products: [] });
  };

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
