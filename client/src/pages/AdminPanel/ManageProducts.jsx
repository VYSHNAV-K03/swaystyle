import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BackButton from '../../components/BackButton';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/admin/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const toggleVerification = async (productId, isCurrentlyVerified) => {
    const apiUrl = `/admin/products/${productId}/${
      isCurrentlyVerified ? 'unverify' : 'verify'
    }`;
    try {
      const response = await axios.put(apiUrl);
      const updatedProducts = products.map((product) =>
        product._id === productId ? response.data : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error toggling verification status', error);
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="manage-products">
      <BackButton />
      <h2>Manage Products</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Verified Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>
                {product.isVerified ? (
                  <span className="badge bg-success">Verified</span>
                ) : (
                  <span className="badge bg-danger">Not Verified</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => handleViewDetails(product)}
                >
                  View Details
                </button>
              </td>
              <td>
               
                <Button
                  variant={product.isVerified ? 'danger' : 'success'}
                  size="sm"
                  onClick={() =>
                    toggleVerification(product._id, product.isVerified)
                  }
                >
                  {product.isVerified ? 'Unverify' : 'Verify'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Viewing Product Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              <h5>Basic Information</h5>
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>

              <h5>Images</h5>
              {selectedProduct.image && selectedProduct.image.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {selectedProduct.image.map((img, index) => (
                    <img
                      key={index}
                      src={"http://localhost:5000/" + img} // Directly use the URL from the array
                      alt={`Product Image ${index + 1}`}
                      style={{
                        maxWidth: '100px',
                        maxHeight: '100px',
                        objectFit: 'cover',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p>No images available for this product.</p>
              )}

              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Subcategory:</strong> {selectedProduct.subcategory || 'N/A'}</p>
              <p><strong>Brand:</strong> {selectedProduct.brand || 'N/A'}</p>



              <h5>Pricing & Stock</h5>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Discount Price:</strong> ${selectedProduct.discountPrice || 'N/A'}</p>
              <p><strong>Stock:</strong> {selectedProduct.stock} units</p>

              <h5>Product Specifications</h5>
              <p><strong>Weight:</strong> {selectedProduct.weight || 'N/A'}</p>
              <p>
                <strong>Dimensions:</strong>{' '}
                {selectedProduct.dimensions
                  ? `${selectedProduct.dimensions.length || 0} x ${selectedProduct.dimensions.width || 0} x ${selectedProduct.dimensions.height || 0} cm`
                  : 'N/A'}
              </p>
              <p><strong>Material:</strong> {selectedProduct.material || 'N/A'}</p>
              <p><strong>Color Options:</strong> {selectedProduct.colorOptions?.join(', ') || 'N/A'}</p>

              <h5>Shipping Information</h5>
              <p><strong>Shipping Charges:</strong> ${selectedProduct.shippingCharges}</p>
              <p><strong>Estimated Delivery Time:</strong> {selectedProduct.estimatedDeliveryTime || 'N/A'}</p>

              <h5>Safety & Warnings</h5>
              <p><strong>Safety Warnings:</strong> {selectedProduct.safetyWarnings || 'N/A'}</p>

              <h5>Supplier Information</h5>
              <p><strong>Supplier Name:</strong> {selectedProduct.supplier?.name || 'N/A'}</p>
              <p><strong>Supplier Email:</strong> {selectedProduct.supplier?.email || 'N/A'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageProducts;
