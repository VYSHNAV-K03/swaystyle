import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import axios, { token } from '../axios';

const UploadCustom = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', '12345'); // Replace with actual user ID

    try {
      const response = await axios.post('/customers/uploadcustom', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
         },
      });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError('Failed to upload file');
      setMessage('');
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="p-4 shadow-lg border-0" style={{ maxWidth: '500px', borderRadius: '15px' }}>
        <h3 className="text-center mb-4">Upload Your Image</h3>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Select Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} className="form-control-lg" />
          </Form.Group>
          <Button type="submit" className="mt-3 w-100 btn-lg btn-primary shadow-sm">
            Upload
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default UploadCustom;
