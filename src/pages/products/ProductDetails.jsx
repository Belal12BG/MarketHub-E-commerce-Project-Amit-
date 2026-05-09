import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
  Carousel,
} from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { formatPrice, truncateText } from "../../utils/helpers";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchProduct } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (err) {
        const msg = err.message || "Failed to load product details";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.warn("Please login first to add items to your cart!", {
        onClick: () => navigate("/login"),
        style: { cursor: "pointer" },
      });
      return;
    }
    if (product) {
      addToCart(product);
      toast.success(`${product.title} added to cart!`);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading product details...</p>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || "Product not found"}</Alert>
        <Button variant="primary" as={Link} to="/products">
          Back to Products
        </Button>
      </Container>
    );
  }

  const discount = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;

  return (
    <Container className="py-5">
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back to Products
      </Button>

      <Row>
        {/* Images */}
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            {product.images && product.images.length > 0 ? (
              <Carousel>
                {product.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      style={{
                        height: "500px",
                        objectFit: "contain",
                        background: "#f8f9fa",
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <Card.Img
                variant="top"
                src={product.thumbnail}
                alt={product.title}
                style={{ height: "500px", objectFit: "contain" }}
              />
            )}
          </Card>
        </Col>

        {/* Details */}
        <Col md={6}>
          <h1 className="mb-3">{product.title}</h1>

          <div className="mb-3">
            <Badge bg="info" className="me-2">
              {product.category.toUpperCase()}
            </Badge>
            <Badge bg="success">
              Stock: {product.stock > 0 ? product.stock : "Out of Stock"}
            </Badge>
          </div>

          <h3 className="text-primary mb-3">
            {formatPrice(product.price)}
            {discount > 0 && (
              <>
                <small className="text-muted ms-3 text-decoration-line-through">
                  {formatPrice(product.price / (1 - discount / 100))}
                </small>
                <Badge bg="danger" className="ms-2">
                  -{discount}%
                </Badge>
              </>
            )}
          </h3>

          <div className="mb-4">
            <strong>Rating:</strong>{" "}
            <span className="text-warning">★ {product.rating}</span> / 5
          </div>

          <p className="lead mb-4">{truncateText(product.description, 300)}</p>

          <Button
            variant="success"
            size="lg"
            className="w-100 mb-3"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>

          <div className="text-muted small">
            Brand: {product.brand || "N/A"}
            <br />
            SKU: {product.sku || "N/A"}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
