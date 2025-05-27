import mongoose from "mongoose";

let orderSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    items: [{
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'food'
        },
        quantity: {
            type: Number,
            min: [1, 'Quantity must be at least 1']
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: [0, 'Total price cannot be negative']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'out-for-delivery', 'delivered'],
        default: 'pending'
    }
}, { timestamps: true });

export const Order = mongoose.model("order", orderSchema)