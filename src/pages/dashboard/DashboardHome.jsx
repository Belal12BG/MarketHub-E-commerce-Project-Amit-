import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { getAllUsers } from "../../services/userService";

const DashboardHome = () => {
  const { products = [] } = useContext(ProductContext);
  const { userCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [usersCount, setUsersCount] = useState(0);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    getAllUsers(0, 1)
      .then((data) => setUsersCount(data.total || 0))
      .catch(() => setUsersCount(0))
      .finally(() => setUsersLoading(false));
  }, []);

  const productsCount = products?.length || 0;
  const cartsCount = userCart?.products?.length || 0;

  return (
    <div>
      <h2 className="mb-4">Welcome{user ? `, ${user.username}` : ""}!</h2>
      <p className="text-muted mb-5">
        Manage your e-commerce resources from here.
      </p>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="text-center border-primary shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-primary">Products</Card.Title>
              <Card.Text className="display-5 fw-bold">
                {productsCount}
              </Card.Text>
              <Card.Text className="text-muted">
                Total products in the system
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="text-center border-success shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-success">Users</Card.Title>
              <Card.Text className="display-5 fw-bold">
                {usersLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  usersCount
                )}
              </Card.Text>
              <Card.Text className="text-muted">Registered users</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="text-center border-info shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-info">Cart Items</Card.Title>
              <Card.Text className="display-5 fw-bold">{cartsCount}</Card.Text>
              <Card.Text className="text-muted">
                Items in current user cart
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <Card.Title>Quick Navigation</Card.Title>
          <p className="text-muted">Use the sidebar or top menu to:</p>
          <ul>
            <li>Manage all products</li>
            <li>View users</li>
            <li>Monitor carts and orders</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardHome;
