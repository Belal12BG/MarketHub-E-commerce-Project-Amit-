import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Button,
  Spinner,
  Alert,
  Modal,
  ListGroup,
} from "react-bootstrap";
import { CartContext } from "../../context/CartContext";

const CartsManagement = () => {
  const { carts, fetchAllCarts, loading } = useContext(CartContext);
  const [selectedCart, setSelectedCart] = useState(null);

  useEffect(() => {
    fetchAllCarts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Manage Carts</h2>

      {carts.length === 0 ? (
        <Alert variant="info">No carts found</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Total Products</th>
              <th>Total Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => (
              <tr key={cart.id}>
                <td>{cart.id}</td>
                <td>{cart.userId}</td>
                <td>{cart.products.length}</td>
                <td>{cart.products.reduce((sum, p) => sum + p.quantity, 0)}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => setSelectedCart(cart)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Cart Details Modal */}
      <Modal show={!!selectedCart} onHide={() => setSelectedCart(null)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Cart #{selectedCart?.id} — User {selectedCart?.userId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {selectedCart?.products.map((p) => (
              <ListGroup.Item
                key={p.id}
                className="d-flex justify-content-between"
              >
                <span>{p.title}</span>
                <span className="text-muted">
                  x{p.quantity} — ${p.price}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedCart(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartsManagement;
