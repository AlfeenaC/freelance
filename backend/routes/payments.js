const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const paypal = require('@paypal/checkout-server-sdk');
const Bid = require('../models/Bid');
const Task = require('../models/Task');
const Payment = require('../models/Payment');

// PayPal configuration
let environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
let client = new paypal.core.PayPalHttpClient(environment);

// Create PayPal order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { bidId } = req.body;
    
    const bid = await Bid.findById(bidId)
      .populate('task')
      .populate('bidder');
    
    if (!bid) {
      return res.status(404).json({ msg: 'Bid not found' });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: bid.amount.toString()
        },
        description: `Payment for task: ${bid.task.title}`
      }]
    });

    const order = await client.execute(request);
    
    res.json({ orderId: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Capture PayPal payment
router.post('/capture-payment', auth, async (req, res) => {
  try {
    const { orderID, bidId } = req.body;

    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ msg: 'Bid not found' });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const capture = await client.execute(request);

    if (capture.result.status === 'COMPLETED') {
      // Create payment record
      const payment = new Payment({
        task: bid.task,
        bid: bid._id,
        payer: req.user.id,
        recipient: bid.bidder,
        amount: bid.amount,
        paypalPaymentId: capture.result.id,
        status: 'completed'
      });

      await payment.save();

      // Update task and bid status
      await Task.findByIdAndUpdate(bid.task, {
        status: 'in_progress',
        selectedBid: bid._id
      });

      await Bid.findByIdAndUpdate(bid._id, { status: 'accepted' });

      res.json({ success: true, payment });
    } else {
      res.status(400).json({ msg: 'Payment failed' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
