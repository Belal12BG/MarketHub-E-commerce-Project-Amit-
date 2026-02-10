import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Spinner,
  Alert,
  Image,
} from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out");
    navigate("/login");
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading profile...</p>
      </Container>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow border-0">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h3 className="mb-0">My Profile</h3>
            </Card.Header>

            <Card.Body className="text-center">
              {user.image ? (
                <Image
                  src={user.image}
                  roundedCircle
                  alt={`${user.firstName} ${user.lastName}`}
                  width={150}
                  height={150}
                  className="mb-4 border border-3 border-primary"
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto mb-4"
                  style={{ width: 150, height: 150, fontSize: "3rem" }}
                >
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </div>
              )}

              <h4 className="mb-1">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-muted mb-4">@{user.username}</p>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Email:</strong> {user.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Age:</strong> {user.age || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Gender:</strong>{" "}
                  {user.gender
                    ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                    : "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone:</strong> {user.phone || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Birth Date:</strong> {user.birthDate || "N/A"}
                </ListGroup.Item>
                {user.address && (
                  <ListGroup.Item>
                    <strong>Address:</strong> {user.address.address},{" "}
                    {user.address.city}, {user.address.state}
                  </ListGroup.Item>
                )}
              </ListGroup>

              <div className="mt-5">
                <Button
                  variant="outline-primary"
                  className="me-3"
                  size="lg"
                  onClick={() =>
                    toast.info(
                      "Edit profile feature coming soon! (DummyJSON mock API limitation)",
                    )
                  }
                >
                  Edit Profile
                </Button>

                <Button variant="danger" size="lg" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Card.Body>

            <Card.Footer className="text-center text-muted small">
              Member since: {new Date().toLocaleDateString()}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
