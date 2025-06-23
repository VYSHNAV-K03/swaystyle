import React, { useEffect, useState } from 'react';
import axiosInstance, { base } from '../axios';

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the wishlist items when the component mounts
    const fetchWishlist = async () => {
      try {
        // Assuming you have a backend endpoint to fetch the user's wishlist
        const response = await axiosInstance.get('/wishlist'); // Change this endpoint to match your backend
        setWishlistItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch wishlist', err);
        setError('Failed to load wishlist');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  console.log(wishlistItems);
  

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axiosInstance.delete(`/wishlist/remove/${productId}`);
      // Remove the item from the state after successful deletion
      setWishlistItems(wishlistItems.filter(item => item.productId !== productId));
      window.location.reload();
    } catch (err) {
      console.error('Failed to remove item from wishlist', err);
    }
  };

  

  if (loading) return <div className="text-center py-5">Loading wishlist...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container my-5">
      <h2>Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p>No items in your wishlist yet.</p>
      ) : (
        <div className="row">
          {wishlistItems.map((item) => (
            <div key={item.productId} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={base + item.productId.image[0]} // Adjust this according to your API response
                  alt={item.productId.name}
                  className="card-img-top"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.productId.name}</h5>
                  <p className="card-text">
                    ${item.productId.price} {/* Adjust the price field */}
                  </p>

                  {/* Buttons */}
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => window.location.href = `/item/${item.productId._id}`} // Link to product details page
                    >
                      View Product
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromWishlist(item.productId._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
