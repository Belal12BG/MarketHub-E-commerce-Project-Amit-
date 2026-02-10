import React from "react";
import { Table, Button } from "react-bootstrap";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
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
              <Button
                variant="warning"
                size="sm"
                onClick={() => onEdit(user)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(user.id)}
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

export default UserTable;
