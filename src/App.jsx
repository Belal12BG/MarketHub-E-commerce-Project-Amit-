import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import CustomNavbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <div className="d-flex flex-column min-vh-100">
            {/* Navbar */}
            <CustomNavbar />

            {/* Main Content */}
            <Container className="flex-grow-1 py-4">
              {/* الـ Routes اللي هتظهر الصفحات */}
              <AppRoutes />
            </Container>

            {/* Footer */}
            <Footer />
          </div>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
