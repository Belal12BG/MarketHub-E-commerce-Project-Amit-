import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { ThemeContext } from "../../context/ThemeContext";
import {
  FiShoppingCart,
  FiUser,
  FiHome,
  FiShoppingBag,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const CustomNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { userCart } = useContext(CartContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const cartCount =
    userCart?.products?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          <FiShoppingBag className="me-2" size={28} />
          MarketHub
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="mx-2 fw-medium d-flex align-items-center"
            >
              <FiHome className="me-1" size={18} />
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              className="mx-2 fw-medium d-flex align-items-center"
            >
              <FiShoppingBag className="me-1" size={18} />
              Shop
            </Nav.Link>
            {user && (
              <Nav.Link
                as={Link}
                to="/dashboard"
                className="mx-2 fw-medium d-flex align-items-center"
              >
                <MdDashboard className="me-1" size={18} />
                Dashboard
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "50px",
                width: "52px",
                height: "28px",
                cursor: "pointer",
                position: "relative",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                padding: "0 4px",
                justifyContent: isDark ? "flex-end" : "flex-start",
              }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              >
                {isDark ? "☀️" : "🌙"}
              </span>
            </button>

            {user ? (
              <>
                {/* Cart with badge */}
                <Nav.Link
                  as={Link}
                  to="/cart"
                  className="d-flex align-items-center position-relative px-2"
                >
                  <FiShoppingCart size={22} />
                  {cartCount > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      style={{
                        position: "absolute",
                        top: "-4px",
                        right: "-2px",
                        fontSize: "0.65rem",
                        minWidth: "18px",
                        height: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </Badge>
                  )}
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="d-flex align-items-center"
                >
                  <FiUser className="me-1" size={18} />
                  <span className="fw-medium">{user.username}</span>
                </Nav.Link>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="rounded-pill px-3"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="fw-medium">
                  Login
                </Nav.Link>
                <Button
                  as={Link}
                  to="/register"
                  variant="light"
                  size="sm"
                  className="rounded-pill px-3 fw-medium"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
