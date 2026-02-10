import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { getAllUsers } from "../../services/userService";
import { toast } from "react-toastify";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers(0, 100)
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch(() => {
        toast.error("Failed to load users");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    toast.info("User delete successfully");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        No users found
      </Alert>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Manage Users</h2>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.phone}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" disabled>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={handleDelete}>
                  Delete (Mock)
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Alert variant="light" className="mt-4">
        <strong>Note:</strong> Edit & Delete operations are mock only because
        DummyJSON API does not support real user modifications.
      </Alert>
    </div>
  );
};

export default UsersManagement;
