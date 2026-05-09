import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  Button,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Home = () => {
  const { products, categories, fetchProducts, fetchCategories } =
    useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts({ limit: 6 });
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.warn("Please login first to add items to your cart!", {
        onClick: () => navigate("/login"),
        style: { cursor: "pointer" },
      });
      return;
    }
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  const pad = (n) => String(n).padStart(2, "0");

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

  const featuredProducts = products.slice(0, 6);

  const extendedCategories = [
    ...new Set([
      ...categories,
      "furniture",
      "electronics",
      "home-decoration",
      "groceries",
    ]),
  ].slice(0, 8);

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

  const features = [
    { icon: "🚚", title: "Free Shipping", description: "On orders over $50" },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    { icon: "↩️", title: "Easy Returns", description: "30-day return policy" },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Dedicated customer service",
    },
  ];

  const specialOffers = [
    {
      title: "Smartphones Sale",
      discount: "Up to 40% OFF",
      desc: "Latest models at unbeatable prices",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: "📱",
      sold: 78,
    },
    {
      title: "Laptop Deals",
      discount: "Up to 30% OFF",
      desc: "Power and performance for less",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "💻",
      sold: 55,
    },
    {
      title: "Skincare Bundles",
      discount: "Buy 2 Get 1 FREE",
      desc: "Premium beauty at great value",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: "✨",
      sold: 90,
    },
    {
      title: "Home Decor",
      discount: "Up to 50% OFF",
      desc: "Transform your living space",
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      icon: "🏠",
      sold: 42,
    },
  ];

  const brands = [
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Samsung",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    },
    {
      name: "Sony",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
    },
    {
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      name: "Adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      name: "IKEA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Ikea_logo.svg",
    },
    {
      name: "Zara",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
    },
    {
      name: "LG",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/LG_logo_%282015%29.svg",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <Carousel fade interval={5000} indicators controls>
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
              />
            </div>
            <Carousel.Caption className="hero-caption">
              <div className="caption-content">
                <Badge bg="light" text="dark" className="mb-3 px-3 py-2">
                  SPECIAL OFFER
                </Badge>
                <h1 className="display-3 fw-bold mb-4">{banner.title}</h1>
                <p className="lead fs-4 mb-4">{banner.description}</p>
                <Button
                  as={Link}
                  to="/products"
                  variant="light"
                  size="lg"
                  className="px-5 py-3"
                >
                  Shop Now →
                </Button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="py-5">
        {/* Features */}
        <Row className="g-4 mb-5 py-3">
          {features.map((feature, index) => (
            <Col key={index} xs={6} md={3}>
              <Card className="border-0 h-100 text-center shadow-sm">
                <Card.Body className="p-4">
                  <div style={{ fontSize: "2.2rem" }} className="mb-3">
                    {feature.icon}
                  </div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted mb-0 small">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Categories */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-2">Shop by Category</h2>
          <p className="text-muted fs-5">Explore our wide range of products</p>
        </div>
        <Row className="g-4 justify-content-center mb-5">
          {extendedCategories.map((cat) => (
            <Col key={cat} xs={6} sm={4} md={3}>
              <Link
                to={`/products?category=${cat}`}
                className="text-decoration-none"
              >
                <Card
                  className="border-0 shadow-sm h-100 overflow-hidden"
                  style={{ transition: "transform 0.2s", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img
                    src={
                      categoryImages[cat] ||
                      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80"
                    }
                    alt={cat}
                    className="w-100"
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center py-3">
                    <Card.Title className="text-capitalize fw-bold mb-0 fs-6">
                      {cat.replace(/-/g, " ")}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Flash Deals */}
        <div className="text-center mb-4 mt-5 pt-3">
          <h2 className="display-5 fw-bold mb-2">🔥 Flash Deals</h2>
          <p className="text-muted fs-5">
            Limited time offers — don't miss out!
          </p>
          <div className="d-inline-flex align-items-center gap-2 bg-dark text-white rounded-pill px-4 py-2 mb-4">
            <span className="small">Ends in:</span>
            {[
              pad(timeLeft.hours),
              pad(timeLeft.minutes),
              pad(timeLeft.seconds),
            ].map((unit, i) => (
              <React.Fragment key={i}>
                <span
                  className="fw-bold fs-5 bg-danger rounded px-2 py-1"
                  style={{ minWidth: "42px", textAlign: "center" }}
                >
                  {unit}
                </span>
                {i < 2 && <span className="fw-bold fs-5">:</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
        <Row className="g-4 mb-5">
          {specialOffers.map((offer, index) => (
            <Col key={index} xs={12} sm={6} lg={3}>
              <Card
                className="border-0 shadow h-100 overflow-hidden"
                style={{ transition: "transform 0.2s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  className="d-flex flex-column align-items-center justify-content-center p-4 text-white"
                  style={{ background: offer.color, minHeight: "160px" }}
                >
                  <span style={{ fontSize: "3rem" }}>{offer.icon}</span>
                  <h4 className="fw-bold mt-2 mb-1 text-center">
                    {offer.title}
                  </h4>
                  <Badge bg="light" text="dark" className="fs-6 px-3 py-2">
                    {offer.discount}
                  </Badge>
                </div>
                <Card.Body className="pt-3 pb-4 px-4">
                  <p className="text-muted small mb-3">{offer.desc}</p>
                  <div className="d-flex justify-content-between small text-muted mb-1">
                    <span>Sold</span>
                    <span>{offer.sold}%</span>
                  </div>
                  <ProgressBar
                    now={offer.sold}
                    variant={
                      offer.sold > 75
                        ? "danger"
                        : offer.sold > 50
                          ? "warning"
                          : "success"
                    }
                    style={{ height: "6px" }}
                  />
                  <p className="text-danger small mt-2 mb-0 fw-semibold">
                    {offer.sold > 75 ? "Almost sold out!" : "Selling fast!"}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Featured Products */}
        <div className="text-center mb-5 mt-5 pt-3">
          <h2 className="display-5 fw-bold mb-2">Featured Products</h2>
          <p className="text-muted fs-5">Handpicked items just for you</p>
        </div>
        <Row xs={1} sm={2} md={3} className="g-4 mb-4">
          {featuredProducts.map((product) => (
            <Col key={product.id}>
              <Card className="h-100 shadow border-0 overflow-hidden rounded-3">
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  alt={product.title}
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-1 fs-6">{product.title}</Card.Title>
                  <Card.Text className="text-muted mb-1 small">
                    Rating: {product.rating} ★
                  </Card.Text>
                  <Card.Text className="fw-bold mb-3">
                    ${product.price}
                  </Card.Text>
                  <div className="mt-auto d-flex gap-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline-primary btn-sm flex-grow-1"
                    >
                      Details
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-grow-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mb-5">
          <Button
            as={Link}
            to="/products"
            variant="dark"
            size="lg"
            className="px-5 py-3"
          >
            View All Products →
          </Button>
        </div>

        {/* Top Brands */}
        <div className="text-center mb-4 mt-5 pt-3">
          <h2 className="display-5 fw-bold mb-2">Top Brands</h2>
          <p className="text-muted fs-5">
            Shop from the world's most trusted names
          </p>
        </div>
        <Row className="g-3 justify-content-center mb-5 pb-3">
          {brands.map((brand, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={3}>
              <Card
                className="border-0 shadow-sm text-center h-100"
                style={{ transition: "all 0.2s", cursor: "default" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <Card.Body className="py-4 px-3 d-flex flex-column align-items-center justify-content-center">
                  <div
                    className="d-flex align-items-center justify-content-center mb-3 rounded"
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "#f8f9fa",
                      padding: "12px",
                    }}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `<span class="fw-bold text-muted fs-4">${brand.name[0]}</span>`;
                      }}
                    />
                  </div>
                  <h6 className="fw-bold mb-0">{brand.name}</h6>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Newsletter */}
        <div className="mb-4">
          <Card className="border-0 shadow-lg overflow-hidden">
            <Card.Body
              className="p-5 text-center"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
              }}
            >
              <h3 className="display-6 fw-bold mb-3">Join Our Newsletter</h3>
              <p className="lead mb-4">
                Get exclusive deals and updates delivered to your inbox
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <input
                  type="email"
                  className="form-control"
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
