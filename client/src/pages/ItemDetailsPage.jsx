import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance, { base } from '../axios';
import Carousel from 'react-bootstrap/Carousel'; // Ensure you have installed react-bootstrap and bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import ModelViewer from '../components/ModelViewer';

const ItemDetailsPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [reviewImage, setReviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rating, setRating] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false); // Track if the product is in the wishlist
  const [size, setsize] = useState('');


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/customers/products/${itemId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/review/${itemId}/reviews`);
        setReviews(response.data);
      } catch (err) {
        console.error('Failed to fetch reviews', err);
      }
    };
    const checkWishlistStatus = async () => {
      try {
        const response = await axiosInstance.get(`/wishlist/check/${itemId}`);
        setIsInWishlist(response.data.isInWishlist);
      } catch (err) {
        console.error('Error checking wishlist status', err);
      }
    };
  
    checkWishlistStatus();
    fetchProduct();
    fetchReviews();
  }, [itemId]);

  console.log(product);
  


const handleAddToWishlist = async () => {
  try {
    if (isInWishlist) {
      // Remove from wishlist if it's already there
      await axiosInstance.delete(`/wishlist/remove/${itemId}`);
      setIsInWishlist(false);
      alert('Product removed from wishlist!');
    } else {
      // Add to wishlist
      await axiosInstance.post(`/wishlist/add`, { productId: itemId });
      setIsInWishlist(true);
      alert('Product added to wishlist!');
    }
  } catch (err) {
    console.error('Error adding to wishlist', err);
    alert('Failed to update wishlist.');
  }
};

  const handleBuyNow = () => {
    navigate(`/payment/${itemId}/${product.discountPrice || product.price}`);
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    console.log(size);
    
    try {
      await axiosInstance.post(`/cart/add`, {
        productId: itemId,
        quantity: 1, // Default quantity
        size: size,
      });
      alert('Product added to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to add product to cart.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewText) return alert('Please enter a review');
    
    const formData = new FormData();
    formData.append('text', reviewText);
    formData.append('rating', rating);
    if (reviewImage) formData.append('image', reviewImage);

    try {
      await axiosInstance.post(`/review/${itemId}/reviews`, formData);
      setReviewText('');
      setReviewImage(null);
      setRating(5);
      alert('Review submitted!');
      window.location.reload();
    } catch (err) {
      console.error('Error submitting review', err);
      alert('Failed to submit review');
    }
  };
  
  const handleTryon = async (modelPath) => {
    navigate('/dress3d',{
      state: { modelPath }
    })
  }
  const handleAnimate = async (modelPath) => {
    navigate('/animate',{
      state: { modelPath }
    })
  }
  const handleSizeClick = (size) => {
    console.log(size);
    // Add logic to handle size selection and update the cart or wishlist accordingly
    setsize(size);

    
  };


  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!product) return <div className="text-center">Product not found.</div>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {/* Image Carousel */}
        <div className="col-md-6">
          <Carousel fade>
            {product.image.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={base + img}
                  alt={`Product image ${index + 1}`}
                  style={{
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <button
                className="btn btn-primary btn-lg m-3"
                onClick={()=>{handleTryon(product.modelpath)}}
              >
                Try on
              </button>
              <button
                className="btn btn-primary btn-lg m-3"
                onClick={()=>{handleAnimate(product.modelpath)}}
              >
                Animate
              </button>
                  
        </div>

        {/* Product Details */}
        <div className="col-md-6 mt-4 mt-md-0">
          <div className="card shadow-lg border-light p-4">
            <h2 className="text-primary mb-3">{product.name}</h2>
            <h4 className="text-success">
              ${product.discountPrice || product.price}
            </h4>

            {product.discountPrice && (
              <p className="text-muted">
                <del>${product.price}</del> (Discount Applied)
              </p>
            )}

            <div className="mb-3">
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Material:</strong> {product.material}</p>
            </div>

            <div className="mb-3">
              <p>
                <strong>Stock:</strong> 
                {product.stock > 0 ? `${product.stock} available` : <span className="text-danger">Out of stock</span>}
              </p>

              {product.colorOptions && product.colorOptions.length > 0 && (
                <p><strong>Colors:</strong>
                  {product?.colorOptions[0]
                    .split(',')
                    .map((color, index) => (
                      <span
                        key={index}
                        style={{
                          display: 'inline-block',
                          width: '20px',
                          height: '20px',
                          backgroundColor: color.trim(), // Trim to remove extra spaces
                          border: '1px solid #ddd',
                          marginRight: '8px',
                          borderRadius: '50%',
                        }}
                      />
                    ))}
                </p>
              )}

{product.sizes && product.sizes.length > 0 && (
  <p><strong>Sizes:</strong>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {product.sizes.map((size, index) => (
        <span
          key={index}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#ddd'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#f0f0f0'}
          onClick={() => handleSizeClick(size)}
        >
          {size}
        </span>
      ))}
    </div>
    {/* Button to open size chart modal */}
    <button 
      onClick={() => setShowModal(true)} 
      style={{
        marginTop: '10px',
        padding: '8px 16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Check Size Chart
    </button>
  </p>
)}

{/* Modal for Size Chart */}
{showModal && (
  <div 
    style={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: '1000',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onClick={() => setShowModal(false)} // Close modal on clicking outside
  >
    <div 
      style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onClick={(e) => e.stopPropagation()} // Prevent closing modal on clicking inside
    >
      <h2>Size Chart</h2>
      {/* Size chart content */}
      <p>Here you can display the detailed size chart.</p>
      <button 
        onClick={() => setShowModal(false)} 
        style={{
          padding: '8px 16px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </div>
  </div>
)}

              

            </div>

            <div className="mb-3">
              <p><strong>Shipping:</strong> ${product.shippingCharges}</p>
              <p><strong>Estimated Delivery:</strong> {product.estimatedDeliveryTime || 'N/A'}</p>
            </div>

            {product.safetyWarnings && <p className="text-danger"><strong>Warnings:</strong> {product.safetyWarnings}</p>}

            {/* Buy Button */}
            <div className="d-flex gap-3 mt-4">
              
              <button
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                disabled={addingToCart || product.stock === 0}
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              {/* Add to Wishlist Button */}
                <button
                  className={`btn btn-outline-${isInWishlist ? 'danger' : 'primary'} btn-lg`}
                  onClick={handleAddToWishlist}
                >
                  {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
            </div>
          </div>
        </div>
         {/* Review Section */}
      <div className="mt-5">
        <h3>Customer Reviews</h3>
        <ul className="list-group">
          {reviews.map((review, index) => (
            <li key={index} className="list-group-item">
              <strong>{review.text}</strong>
              <p>{'⭐'.repeat(review.rating)}</p>
              {review.image && (
                <img
                src={base + review.image}
                alt="Review"
                style={{ width: '100px', cursor: 'pointer' }}
                onClick={() => setSelectedImage(base + review.image)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Add Review Form */}
      <div className="mt-4">
        <h4>Write a Review</h4>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Share your thoughts"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
          <label>Rating:</label>
          <select className="form-control mb-2" value={rating} onChange={(e) => setRating(e.target.value)} required>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{'⭐'.repeat(num)}</option>
            ))}
          </select>
        <input
          type="file"
          className="form-control mt-2"
          accept="image/*"
          onChange={(e) => setReviewImage(e.target.files[0])}
        />
        <button className="btn btn-success mt-2" onClick={handleSubmitReview}>Submit Review</button>
      </div>

      {/* Image Modal */}
      <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)}>
        <Modal.Body className="text-center">
          {selectedImage && <img src={selectedImage} alt="Enlarged" className="img-fluid" />}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setSelectedImage(null)}>Close</button>
        </Modal.Footer>
      </Modal>

      </div>
    </div>
  );
};

export default ItemDetailsPage;
