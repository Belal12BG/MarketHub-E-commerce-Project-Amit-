import React, { useContext, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { ProductContext } from "../../context/ProductContext";
import { toast } from "react-toastify";

const ProductsManagement = () => {
  const { products, createProduct, editProduct, removeProduct } =
    useContext(ProductContext);

  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    thumbnail: "",
  });

  const openAddModal = () => {
    setCurrentProduct(null);
    setFormData({ title: "", price: "", category: "", thumbnail: "" });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      thumbnail: product.thumbnail || "",
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      removeProduct(id);
      toast.success("Product deleted");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentProduct) {
      editProduct(currentProduct.id, formData);
      toast.success("Product updated");
    } else {
      createProduct(formData);
      toast.success("Product added");
    }

    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
        <Button variant="success" onClick={openAddModal}>
          + Add Product
        </Button>
      </div>

      <Table striped bordered hover responsive className="shadow">
        <thead className="table-dark">
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
                  className="me-2"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add / Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentProduct ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentProduct ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductsManagement;
