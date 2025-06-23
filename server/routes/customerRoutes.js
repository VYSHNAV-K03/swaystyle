// routes/customerRoutes.js
const express = require("express");
const Product = require("../models/Product"); // Import the Product model
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Customize = require("../models/Customize");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store images in 'uploads/' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });
// Get customer profile (Mock example)
router.get("/profile", (req, res) => {
  res.json({ id: 1, name: "John Doe", email: "johndoe@example.com" });
});

// Update customer profile (Mock example)
router.put("/profile", (req, res) => {
  const updatedProfile = req.body;
  res.json({ message: "Profile updated successfully", updatedProfile });
});

router.post(
  "/uploadcustom",
  upload.single("image"),
  authMiddleware,
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      console.log(req.file.path);
      console.log(req.body);

      const newImage = new Customize({
        userId: req.user.userId, // Ensure the user ID is sent in the request body
        imgpath: req.file.path, // Store the image path
      });

      await newImage.save();
      res
        .status(201)
        .json({ message: "Image uploaded successfully", data: newImage });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

router.get("/getcustom", (req, res) => {
  Customize.find()
    .populate("userId")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get all products or filter by category/subcategory
router.get("/products", async (req, res) => {
  try {
    const { category, subcategory, sortBy, sortOrder = "asc" } = req.query;

    // Build query object
    let query = {};
    if (category) query.category = category;
    if (subcategory) query.subcategory = subcategory;

    // Fetch products based on query
    const products = await Product.find(query).sort({
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Get single product details by ID
router.get("/products/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product details" });
  }
});

// Add product to favorites (Mock example)
router.post("/favorites", (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Here you could integrate logic to save the product ID to the customer's favorites in the database
  res.json({ message: `Product ${productId} added to favorites` });
});

// Get customer order history (Mock example)
router.get("/orders", (req, res) => {
  const orders = [
    { id: 1, product: "Product 1", date: "2024-12-01", status: "Delivered" },
    { id: 2, product: "Product 2", date: "2024-12-03", status: "In Transit" },
  ];
  res.json(orders);
});

module.exports = router;
