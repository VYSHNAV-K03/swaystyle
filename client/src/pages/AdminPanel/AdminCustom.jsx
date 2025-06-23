import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import axios from "../../axios"

const AdminCustom = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/customers/getcustom')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Booked Items</h2>
      <Row>
        {items.map((item) => (
          <Col md={4} key={item._id} className="mb-4">
            <Card className="shadow-lg border-0">
              <Card.Img variant="top" src={`http://localhost:5000/${item.imgpath}`} alt="Uploaded" />
              <Card.Body>
                <Card.Title>{item.userId.name}</Card.Title>
                <Card.Text>Email: {item.userId.email}</Card.Text>
                <Card.Text>Booked By: {item.userId._id}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminCustom;
