import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card
      className="h-100 shadow-lg border-0 overflow-hidden rounded-3"
      style={{ minHeight: "400px" }}
    >
      <Card.Img
        variant="top"
        src={product.thumbnail}
        alt={product.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2">{product.title}</Card.Title>
        <Card.Text className="text-muted mb-1">
          Rating: {product.rating} ★
        </Card.Text>
        <Card.Text className="fw-bold fs-5 mb-3">${product.price}</Card.Text>
        <div className="mt-auto d-flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-primary flex-grow-1"
          >
            Details
          </Link>
          <Button
            variant="primary"
            onClick={() => addToCart(product)}
            className="flex-grow-1"
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
