import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FiShoppingCart, FiUser, FiHome, FiShoppingBag } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const CustomNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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

          <Nav className="align-items-center">
            {user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/cart"
                  className="me-3 d-flex align-items-center"
                >
                  <FiShoppingCart size={22} />
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="me-2 d-flex align-items-center"
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
                <Nav.Link as={Link} to="/login" className="me-2 fw-medium">
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
