import React, { createContext, useState } from "react";
import {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  getAllCategories,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const fetchProducts = async (params = {}, currentSkip = 0) => {
    setLoading(true);
    try {
      const { search, category, sort } = params;
      let data;
      if (search) {
        data = await searchProducts(search);
      } else if (category) {
        data = await getProductsByCategory(category);
      } else {
        data = await getAllProducts(limit, currentSkip);
        setTotal(data.total);
      }
      if (sort) {
        data.products.sort((a, b) => {
          if (sort === "price") return a.price - b.price;
          if (sort === "-price") return b.price - a.price;
          if (sort === "rating") return b.rating - a.rating;
          if (sort === "title") return a.title.localeCompare(b.title);
          return 0;
        });
      }
      setProducts(data.products || data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data.map((cat) => cat.slug || cat));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchProduct = async (id) => {
    try {
      return await getProductById(id);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const createProduct = async (productData) => {
    try {
      const newProduct = await addProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const editProduct = async (id, productData) => {
    try {
      const updated = await updateProduct(id, productData);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handlePagination = (newSkip) => {
    setSkip(newSkip);
    fetchProducts({}, newSkip);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        total,
        skip,
        limit,
        fetchProducts,
        fetchCategories,
        fetchProduct,
        createProduct,
        editProduct,
        removeProduct,
        handlePagination,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
