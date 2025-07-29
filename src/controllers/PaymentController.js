import { Payment } from "../models/PaymentSchema.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import shortid from "shortid";


const razorpay = new Razorpay({
  key_id: "rzp_test_RRRqrm1ahDFT82",
  key_secret: "mIJhHvktdpwRj8jStLxrtdFc",
});

const RazorpayOrder = async (req, res) => {
  try {
    const { customer, amount } = req.body; // ✅ FIXED

    const options = {
      amount: amount * 100, // Convert rupees to paise
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const payment = new Payment({
      customer, // ✅ USE CORRECT VARIABLE
      amount: amount * 100,
      transactionId: razorpayOrder.id,
      status: "Paid",
      paymentMethod: "Razorpay",
    });

    await payment.save();

    res.status(201).json({ success: true, order: razorpayOrder });
  } catch (error) {
    console.error("RazorpayOrder Error:", error.message

    ); // helpful debug
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Razorpay payment
const verifyRazorpay = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const event = req.body;
    if (event.event === "payment.captured") {
      const { order_id, payment_id } = event.payload.payment.entity;

      const payment = await Payment.findOneAndUpdate(
        { transactionId: order_id },
        { status: "Paid", transactionId: payment_id },
        { new: true }
      );

      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment record not found" });
      }
    }

    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let createPayment = async (req, res) => {
  let reqData = req.body;
  try {
    let result = await Payment.create(reqData);
    res.status(200).json({
      data: result,
      message: "Payment Added Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

let fetchPayment = async (req, res) => {
  try {
    let result = await Payment.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

let deletePayment = async (req, res) => {
  try {
    let { paymentId } = req.body;
    let result = await Payment.findByIdAndDelete({ _id: paymentId });
    res.status(200).json({
      message: "Payment Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// let updatePayment = async (req, res) => {
//   let { paymentId, rating } = req.body;
//   let result = await Payment.findByIdAndUpdate(
//     { _id: paymentId },
//     { comment: comment },
//     { new: true }
//   );
//   try {
//     res.status(200).json({
//       data: result,
//       message: "Payment Updated",
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export {
  createPayment,
  fetchPayment,
//   updatePayment,
  deletePayment,
  RazorpayOrder,
  verifyRazorpay,
};
