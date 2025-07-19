import mongoose from "mongoose";

let foodSchema = mongoose.Schema({
    foodname: {
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
    image: { type: String }
}, { timestamps: true })

export const Food = mongoose.model("food", foodSchema)