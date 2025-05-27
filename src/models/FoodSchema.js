import mongoose from "mongoose";

let foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Food name is required'],
        trim: true
    },
    description: { type: String },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        enum: ['appetizer', 'main-course', 'dessert', 'beverage']
    },
    image: { type: String },
    averageRating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be negative'],
        max: [5, 'Rating cannot exceed 5']
    }
}, { timestamps: true })

export const Food = mongoose.model("food", foodSchema)