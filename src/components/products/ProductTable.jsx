import React from "react";
import { Table, Button } from "react-bootstrap";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>${product.price}</td>
            <td>{product.category}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                onClick={() => onEdit(product)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;
