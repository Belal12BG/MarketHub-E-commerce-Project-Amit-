import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import CartTable from "../../components/carts/CartTable";
import { formatPrice } from "../../utils/helpers";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { userCart, removeFromCart, clearCart, calculateTotal } =
    useContext(CartContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const total = calculateTotal();

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    toast.success("Product removed from cart");
  };

  const handleClearCart = () => {
    if (window.confirm("Clear your cart?")) {
      clearCart();
      toast.success("Cart cleared");
    }
  };

  // 🛒 Empty cart design
  if (!userCart.products.length) {
    return (
      <Container className="py-5 d-flex justify-content-center">
        <Card className="text-center shadow-sm p-5" style={{ maxWidth: 500 }}>
          <FaShoppingCart size={90} className="text-muted mb-4" />
          <h3>Your cart is empty</h3>
          <p className="text-muted mb-4">
            Start adding products to see them here
          </p>
          <Button as={Link} to="/products" size="lg">
            Browse Products
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Your Shopping Cart</h1>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <CartTable
                cartItems={userCart.products}
                onRemove={handleRemoveItem}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: 100 }}>
            <Card.Body>
              <h4>Order Summary</h4>
              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <h5>Total</h5>
                <h5>{formatPrice(total)}</h5>
              </div>

              <Button variant="success" className="w-100 mb-2">
                Proceed to Checkout
              </Button>

              <Button
                variant="outline-danger"
                className="w-100"
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
