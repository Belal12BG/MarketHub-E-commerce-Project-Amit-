import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <Container>
        <Row className="g-4">
          <Col lg={4} md={6}>
            <h5 className="fw-bold mb-3">
              <span className="me-2">🛍️</span>
              MarketHub
            </h5>
            <p className="text-white-50 mb-3">
              Your trusted destination for quality products. Shop the latest
              trends in electronics, fashion, and home essentials with
              confidence.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white text-decoration-none fs-4">
                <i className="bi bi-facebook" />
              </a>
              <a href="#" className="text-white text-decoration-none fs-4">
                <i className="bi bi-instagram" />
              </a>
              <a href="#" className="text-white text-decoration-none fs-4">
                <i className="bi bi-twitter" />
              </a>
              <a href="#" className="text-white text-decoration-none fs-4">
                <i className="bi bi-youtube" />
              </a>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="fw-bold mb-3 text-uppercase">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-white-50 text-decoration-none"
                >
                  Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-white-50 text-decoration-none">
                  Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/profile"
                  className="text-white-50 text-decoration-none"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="fw-bold mb-3 text-uppercase">Customer Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Returns & Refunds
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Shipping Info
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Track Order
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="fw-bold mb-3 text-uppercase">Newsletter</h6>
            <p className="text-white-50 mb-3">
              Subscribe for exclusive deals and updates
            </p>
            <Form>
              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-pill"
                />
              </Form.Group>
              <Button variant="light" className="w-100 rounded-pill fw-medium">
                Subscribe Now
              </Button>
            </Form>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-white-50">
              © {new Date().getFullYear()} MarketHub. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#" className="text-white-50 text-decoration-none me-3">
              Privacy Policy
            </a>
            <a href="#" className="text-white-50 text-decoration-none me-3">
              Terms of Service
            </a>
            <a href="#" className="text-white-50 text-decoration-none">
              Cookies
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
