import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance, { base } from "../axios"; // Assuming you have axiosInstance set up
import "bootstrap/dist/css/bootstrap.min.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosInstance.get("/cart"); // Replace with your backend cart API route
        setCartItems(response.data);
        console.log(response.data);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load cart items.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);



  const handleRemoveItem = async (id) => {
    try {
      await axiosInstance.delete(`/cart/remove/${id}`); // Replace with your backend remove item API route
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to remove item.");
    }
  };

  const handleCheckout = () => {
    navigate("/payment", { state: { cartItems, total: getTotalPrice() + 50 } });
  };
  

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="list-group">
            {cartItems.map((item) => (
              <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={ base + item.image[0]}
                    alt={item.name}
                    className="img-fluid rounded mr-10"
                    style={{ width: "80px", height: "80px", objectFit: "cover",marginRight:"10px" }}
                  />
                  <div className="ml-3">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-0 text-muted">Price:₹{item.price}</p>
                    <p className="mb-0 text-muted">Size:₹{item.size}</p>


                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <p className="mb-0">Qty: {item.quantity}</p>
                  <button
                    className="btn btn-danger ml-3"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="card mt-4">
            <div className="card-body">
              <h4 className="card-title">Cart Summary</h4>
              <div className="d-flex justify-content-between">
                <p>Total Price:</p>
                <p>₹{getTotalPrice()}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Shipping:</p>
                <p>₹50</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Estimated Total:</p>
                <p>₹{getTotalPrice() + 50}</p>
              </div>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
