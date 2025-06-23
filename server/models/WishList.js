const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a 'User' model
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Assuming you have a 'Product' model
    required: true,
  },
}, { timestamps: true }); // Adding timestamps to track when an item is added

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
