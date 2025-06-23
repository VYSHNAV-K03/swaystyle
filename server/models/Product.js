const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number }, // Optional field for discounted price
    stock: { type: Number, required: true },
    image: { type: [String] }, // Array to hold multiple image URLs
    modelpath: { type: String }, // URL or path to 3D model
    colorOptions: { type: [String] }, // Array for color variants
    material: { type: String }, // Material or composition details
    brand: { type: String }, // Brand name
    shippingCharges: { type: Number, default: 0 }, // Optional field for shipping cost
    estimatedDeliveryTime: { type: String }, // Delivery time estimate
    sizes: {
      type: [String], // Array of available sizes (S, M, L, XL, etc.)
    },
    isVerified: { type: Boolean, default: false },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
