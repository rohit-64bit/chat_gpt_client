const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Initialize Razorpay with the provided test keys
const razorpay = new Razorpay({
  key_id: 'rzp_test_TVkhOksU7vM6yd',
  key_secret: '4IlKIpisc952UvrzZZO6sDo2'
});

// @route   POST /api/payment/create-order
// @desc    Create a Razorpay order for Pro upgrade
// @access  Private
router.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: 500 * 100, // amount in smallest currency unit (paise) -> ₹500
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).json({ error: 'Failed to create order' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error creating payment order' });
  }
});

// @route   POST /api/payment/verify
// @desc    Verify Razorpay payment signature and upgrade user
// @access  Private
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', '4IlKIpisc952UvrzZZO6sDo2')
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Simulate successful upgrade since no user is logged in yet
      res.json({ success: true, message: 'Payment verified (Mocked Pro upgrade without login)' });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error verifying payment' });
  }
});

module.exports = router;
