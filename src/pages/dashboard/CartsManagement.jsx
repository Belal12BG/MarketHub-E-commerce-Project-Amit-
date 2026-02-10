import React, { useContext, useEffect } from "react";
import { Table, Button, Spinner, Alert, Card } from "react-bootstrap";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

const CartsManagement = () => {
  const { carts, fetchAllCarts, loading } = useContext(CartContext);

  useEffect(() => {
    fetchAllCarts();
  }, [fetchAllCarts]);

  const viewCartDetails = (cart) => {
    toast.info(
      `Cart ID: ${cart.id} - User ID: ${cart.userId} - Products: ${cart.products.length}`,
    );
  };

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
                <td>
                  {cart.totalProducts ||
                    cart.products.reduce((sum, p) => sum + p.quantity, 0)}
                </td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => viewCartDetails(cart)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <Card.Title>Notes</Card.Title>
          <ul className="mb-0">
            <li>This page shows all carts from the API</li>
            <li>Delete/update cart functionality can be added later</li>
            <li>Use View Details to inspect individual cart items</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartsManagement;
