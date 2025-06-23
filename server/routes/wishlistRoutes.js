const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Wishlist = require('../models/WishList');

// Check if the product is in the user's wishlist

router.get("/",authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const wishlistItems = await Wishlist.find({ userId }).populate('productId'); // Populating product details
    res.json(wishlistItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch wishlist items' });
  }
})

router.get('/check/:productId',authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you're using JWT and have the user's ID
    const productId = req.params.productId;

    const wishlistItem = await Wishlist.findOne({ userId, productId });

    console.log(wishlistItem);
    

    return res.json({ isInWishlist: !!wishlistItem });
  } catch (err) {
    console.error('Error checking wishlist status', err);
    return res.status(500).json({ error: 'Failed to check wishlist status' });
  }
});

// Add a product to the wishlist
router.post('/add',authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId; // Assuming you're using JWT

    // Check if the product is already in the wishlist
    const existingItem = await Wishlist.findOne({ where: { userId, productId } });
    if (existingItem) {
      return res.status(400).json({ error: 'Product is already in the wishlist' });
    }

    // Add the product to the wishlist
    await Wishlist.create({ userId, productId });
    return res.status(201).json({ message: 'Product added to wishlist' });
  } catch (err) {
    console.error('Error adding to wishlist', err);
    return res.status(500).json({ error: 'Failed to add product to wishlist' });
  }
});

// Remove a product from the wishlist
router.delete('/remove/:productId', authMiddleware,async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId; // Assuming you're using JWT

    // Remove the product from the wishlist
    const result = await Wishlist.deleteMany({ userId, productId });

    if (result === 0) {
      return res.status(400).json({ error: 'Product not found in wishlist' });
    }

    return res.json({ message: 'Product removed from wishlist' });
  } catch (err) {
    console.error('Error removing from wishlist', err);
    return res.status(500).json({ error: 'Failed to remove product from wishlist' });
  }
});

module.exports = router;
