import mongoose from "mongoose";

let reviewSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food'
    },
    rating: {
        type: Number,
        required: true,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    comment: {
        type: String,
        maxlength: 500
    }
}, { timestamps: true })

export const Review = mongoose.model("review", reviewSchema)