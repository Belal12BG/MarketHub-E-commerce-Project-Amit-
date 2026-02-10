import React, { useContext, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/products/ProductCard";

const Home = () => {
  const { products, categories, fetchProducts, fetchCategories } =
    useContext(ProductContext);

  useEffect(() => {
    fetchCategories();
    fetchProducts({ limit: 6 });
  }, []);

  const banners = [
    {
      title: "Winter Collection 2026",
      description: "Discover premium quality products with up to 60% off",
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
      color: "#1a1a1a",
    },
    {
      title: "Tech Essentials",
      description: "Latest gadgets and electronics at unbeatable prices",
      img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80",
      color: "#2c3e50",
    },
    {
      title: "Free Shipping Worldwide",
      description: "On all orders over $50 - Limited time offer",
      img: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&q=80",
      color: "#34495e",
    },
  ];

  // Featured products
  const featuredProducts = products.slice(0, 6);

  //  categories
  const extendedCategories = [
    ...new Set([
      ...categories,
      "furniture",
      "electronics",
      "home-decoration",
      "groceries",
    ]),
  ].slice(0, 8);

  // category images
  const categoryImages = {
    smartphones:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    laptops:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    fragrances:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
    skincare:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    groceries:
      "https://images.unsplash.com/photo-1543083115-638c32cd3d58?w=400&q=80",
    furniture:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    electronics:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
    "home-decoration":
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80",
  };

  // Features section
  const features = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: "↩️",
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Dedicated customer service",
    },
  ];

  //  brands
  const uniqueBrands = [
    ...new Set(products.map((p) => p.brand).filter(Boolean)),
  ].slice(0, 8);

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <Carousel
        fade
        interval={5000}
        className="hero-carousel"
        indicators={true}
        controls={true}
      >
        {banners.map((banner, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-image-wrapper">
              <img
                className="d-block w-100"
                src={banner.img}
                alt={banner.title}
                style={{
                  height: "75vh",
                  objectFit: "cover",
                  filter: "brightness(0.7)",
                }}
              />
              <div
                className="carousel-overlay"
                style={{
                  background: `linear-gradient(to right, ${banner.color}ee, ${banner.color}88)`,
                }}
              ></div>
            </div>
            <Carousel.Caption className="hero-caption">
              <div className="caption-content">
                <Badge bg="light" text="dark" className="mb-3 px-3 py-2">
                  SPECIAL OFFER
                </Badge>
                <h1 className="display-3 fw-bold mb-4 animate-slide-up">
                  {banner.title}
                </h1>
                <p className="lead fs-4 mb-4 animate-slide-up">
                  {banner.description}
                </p>
                <Button
                  as={Link}
                  to="/products"
                  variant="light"
                  size="lg"
                  className="shop-now-btn animate-slide-up px-5 py-3"
                >
                  Shop Now →
                </Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="py-5">
        {/* Features Section */}
        <Row className="features-section g-4 mb-5 py-5">
          {features.map((feature, index) => (
            <Col key={index} xs={6} md={3}>
              <Card className="feature-card border-0 h-100 text-center">
                <Card.Body className="p-4">
                  <div className="feature-icon mb-3">{feature.icon}</div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted mb-0 small">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Categories Section */}
        <div className="section-header text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Shop by Category</h2>
          <p className="text-muted fs-5">Explore our wide range of products</p>
        </div>
        <Row className="g-4 justify-content-center mb-5">
          {extendedCategories.map((cat, index) => (
            <Col key={cat} xs={6} sm={4} md={3} lg={3}>
              <Link
                to={`/products?category=${cat}`}
                className="text-decoration-none"
              >
                <Card className="category-card border-0 shadow-sm h-100 overflow-hidden">
                  <div className="category-image-wrapper">
                    <img
                      src={
                        categoryImages[cat] ||
                        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80"
                      }
                      alt={cat}
                      className="w-100"
                      style={{ height: 200, objectFit: "cover" }}
                    />
                    <div className="category-overlay"></div>
                  </div>
                  <Card.Body className="text-center py-3">
                    <Card.Title className="text-capitalize fw-bold mb-0">
                      {cat.replace("-", " ")}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Featured Products */}
        <div className="section-header text-center mb-5 mt-5 pt-5">
          <h2 className="display-5 fw-bold mb-3">Featured Products</h2>
          <p className="text-muted fs-5">Handpicked items just for you</p>
        </div>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-5">
          {featuredProducts.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>

        <div className="text-center mb-5">
          <Button
            as={Link}
            to="/products"
            variant="dark"
            size="lg"
            className="view-all-btn px-5 py-3"
          >
            View All Products →
          </Button>
        </div>

        {/* Top Brands */}
        {uniqueBrands.length > 0 && (
          <>
            <div className="section-header text-center mb-5 mt-5 pt-5">
              <h2 className="display-5 fw-bold mb-3">Shop by Brand</h2>
              <p className="text-muted fs-5">Trusted names you love</p>
            </div>
            <Row className="g-4 justify-content-center mb-5 pb-5">
              {uniqueBrands.map((brand, index) => (
                <Col key={brand} xs={6} sm={4} md={3} lg={2}>
                  <Card className="brand-card border-0 shadow-sm h-100">
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                      <div className="brand-logo mb-3">
                        <span className="fs-2 fw-bold text-muted">
                          {brand.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <Card.Title className="fs-6 fw-bold text-center mb-2">
                        {brand}
                      </Card.Title>
                      <Link
                        to={`/products?brand=${brand}`}
                        className="text-decoration-none"
                      >
                        <small className="text-primary">Explore →</small>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* Newsletter Section */}
        <div className="newsletter-section text-center py-5 mb-5">
          <Card className="border-0 shadow-lg overflow-hidden">
            <Card.Body
              className="p-5"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
              }}
            >
              <h3 className="display-6 fw-bold mb-3">Join Our Newsletter</h3>
              <p className="lead mb-4">
                Get exclusive deals and updates delivered to your inbox
              </p>
              <div className="newsletter-form d-flex justify-content-center gap-3 flex-wrap">
                <input
                  type="email"
                  className="form-control newsletter-input"
                  placeholder="Enter your email address"
                  style={{ maxWidth: "400px" }}
                />
                <Button variant="light" size="lg" className="px-4">
                  Subscribe
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Home;
