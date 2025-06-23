// backend/routes/authRoutes.js
const express = require('express');
const { registerUser, registerSupplier, loginUser } = require('../controllers/authController');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configure file upload

router.post('/register-user',upload.single('profileImage'), registerUser);        // Register a normal user
router.post('/register-supplier', registerSupplier); // Register a supplier
router.post('/login', loginUser);                   // Login for both users and suppliers

module.exports = router;
