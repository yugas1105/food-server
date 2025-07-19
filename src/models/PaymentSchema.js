import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative']
  },
  transactionId: {
    type: String,
    required: true,
   
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded','Paid'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['Card', 'UPI', 'Netbanking', 'Wallet', 'COD','Razorpay'],
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Payment = mongoose.model('payment', paymentSchema);