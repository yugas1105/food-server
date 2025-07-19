import express from 'express'
import { createPayment, deletePayment, fetchPayment, RazorpayOrder, verifyRazorpay } from '../controllers/PaymentController.js'

let paymentRouter = express.Router()

paymentRouter.get("/fetchpayment", fetchPayment)
paymentRouter.post("/createpayment", createPayment)
paymentRouter.delete("/deletepayment", deletePayment)
// paymentRouter.put("/updatepayment", updatePayment)
paymentRouter.post("/razorpayorder", RazorpayOrder)
paymentRouter.post("/verifyrazorpay", verifyRazorpay)

export { paymentRouter}