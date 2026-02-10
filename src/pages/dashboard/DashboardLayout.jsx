import React, { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard" className="fw-bold fs-4">
            Admin Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="dashboard-nav" />
          <Navbar.Collapse id="dashboard-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/dashboard"
                active={isActive("/dashboard")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard/products"
                active={isActive("/dashboard/products")}
              >
                Products
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard/users"
                active={isActive("/dashboard/users")}
              >
                Users
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboard/carts"
                active={isActive("/dashboard/carts")}
              >
                Carts
              </Nav.Link>
            </Nav>
            <Nav>
              <span className="text-white me-3 align-self-center">
                {user ? `Welcome, ${user.username}` : "Admin"}
              </span>
              <Button variant="outline-light" size="sm" onClick={logout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="d-flex flex-grow-1">
        {/* Sidebar  */}
        <div
          className="bg-dark text-white d-none d-md-flex flex-column"
          style={{ width: "240px", minHeight: "100vh" }}
        >
          <Nav className="flex-column p-3">
            <Nav.Link
              as={Link}
              to="/dashboard"
              className={`text-white py-2 px-3 rounded mb-2 ${isActive("/dashboard") && !isActive("/dashboard/") ? "bg-primary" : ""}`}
            >
              Dashboard Overview
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/dashboard/products"
              className={`text-white py-2 px-3 rounded mb-2 ${isActive("/dashboard/products") ? "bg-primary" : ""}`}
            >
              Manage Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/dashboard/users"
              className={`text-white py-2 px-3 rounded mb-2 ${isActive("/dashboard/users") ? "bg-primary" : ""}`}
            >
              Manage Users
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/dashboard/carts"
              className={`text-white py-2 px-3 rounded mb-2 ${isActive("/dashboard/carts") ? "bg-primary" : ""}`}
            >
              Manage Carts
            </Nav.Link>
          </Nav>
        </div>

        {/* Main Content Area */}
        <main className="flex-grow-1 bg-light p-4 p-md-5">
          <Container fluid>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
