import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

import Home from "../pages/Home";
import Products from "../pages/products/Products";
import ProductDetails from "../pages/products/ProductDetails";
import Cart from "../pages/cart/Cart";
import Profile from "../pages/profile/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ProductsManagement from "../pages/dashboard/ProductsManagement";
import UsersManagement from "../pages/dashboard/UsersManagement";
import CartsManagement from "../pages/dashboard/CartsManagement";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="products" element={<ProductsManagement />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="carts" element={<CartsManagement />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="text-center py-5">
            <h2>404 - Page Not Found</h2>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
