import React from 'react';

const OfferCarousel = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center text-success mb-4">Special Offers</h2>
      <div
        id="offerCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000" // Carousel auto-slides every 3 seconds
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://plus.unsplash.com/premium_photo-1729038878379-fc593d6611fd?q=80&w=2027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              style={{ height: '400px', objectFit: 'cover' }}
              alt="Great Indian Festival"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Great Indian Festival</h5>
              <p>Unbeatable discounts on your favorite products. Shop now!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://via.placeholder.com/1200x400?text=Special+Offer+-+Flat+50%25+Off"
              className="d-block w-100"
              alt="Special Offer"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Flat 50% Off</h5>
              <p>Hurry up! Grab the best deals before they're gone!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://via.placeholder.com/1200x400?text=Exclusive+Deals+For+You"
              className="d-block w-100"
              alt="Exclusive Deals"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Exclusive Deals</h5>
              <p>Handpicked products with amazing discounts. Check them out!</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#offerCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#offerCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default OfferCarousel;
