// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin','supplier'], default: 'user' },
    phone: { type: String },
    address: { type: String },
    profileImage: { type: String },
    isAdmin: { type: Boolean, default: false },
    isSupplier: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
