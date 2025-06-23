const authMiddleware = require("../middlewares/authMiddleware");
const enrollmentModel = require("../models/enrollmentModel");
const express = require('express');

const router = express.Router();


router.post('/verify-payment',authMiddleware, async (req, res) => {

  const { items, totalAmount } = req.body;

  console.log("items for payment",items);
  
  try {
    // Step 1: Save enrollment details in the database
    // const newEnrollment = new enrollmentModel({
    //   userId: req.user.userId, // Authenticated user ID
    //   itemId: req.body.itemId,
    //   amountPaid: req.body.amount,
    //   status: 'Paid',
    //   createdAt: new Date(),
    // });

    // await newEnrollment.save();

    const newEnrollment = await enrollmentModel.insertMany(
      items.map(item => ({
        userId: req.user.userId, 
        itemId: item.productId,
        quantity: item.quantity,
        amountPaid: item.price,
        status: "Paid",
        createdAt: new Date(),
      }))
    );
   
    console.log("Payment verified and enrollment saved:", newEnrollment);

    res.status(200).json({ success: true, message: 'Payment verified and booking successful.' });
  } catch (error) {
    console.error("Error during enrollment:", error);
    res.status(500).json({ success: false, message: 'Enrollment saving failed.', error });
  }
});

module.exports = router;
