import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Pagination,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import ProductCard from "../../components/products/ProductCard";

const Products = () => {
  const {
    products,
    categories,
    loading,
    total,
    skip,
    limit,
    fetchProducts,
    fetchCategories,
    handlePagination,
  } = useContext(ProductContext);

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL);
  const [sortBy, setSortBy] = useState("");

  const searchTimeout = useRef(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts({ category: categoryFromURL });
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryFromURL);
    fetchProducts({ category: categoryFromURL });
  }, [categoryFromURL]);

  useEffect(() => {
    if (!searchQuery) {
      fetchProducts({ category: selectedCategory, sort: sortBy });
    }
  }, [selectedCategory, sortBy]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetchProducts({
        search: value,
        category: selectedCategory,
        sort: sortBy,
      });
    }, 500);
  };

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page) => {
    handlePagination((page - 1) * limit);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <Alert variant="info" className="text-center mt-5">
        No products found. Try changing your search or filters.
      </Alert>
    );
  }

  return (
    <Container>
      <h1 className="my-4">Products</h1>

      <Row className="mb-4 g-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by...</option>
            <option value="title">Name (A-Z)</option>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
            <option value="rating">Rating</option>
          </Form.Select>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default Products;
