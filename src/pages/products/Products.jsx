import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  Spinner,
  Alert,
} from "react-bootstrap";
import { ProductContext } from "../../context/ProductContext";
import { CartContext } from "../../context/CartContext";
import ProductCard from "../../components/products/ProductCard";
import { toast } from "react-toastify";
import { debounce } from "../../utils/helpers";

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

  const { addToCart } = useContext(CartContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");

  const debouncedSearch = debounce((value) => {
    fetchProducts({ search: value, category: selectedCategory, sort: sortBy });
  }, 500);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts({
      search: searchQuery,
      category: selectedCategory,
      sort: sortBy,
    });
  }, [selectedCategory, sortBy]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page) => {
    const newSkip = (page - 1) * limit;
    handlePagination(newSkip);
  };

  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

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

      {/* Filters & Search */}
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
          <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={4}>
          <Form.Select value={sortBy} onChange={handleSortChange}>
            <option value="">Sort by...</option>
            <option value="title">Name (A-Z)</option>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
            <option value="rating">Rating</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Products Grid */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {paginationItems}
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
