import mongoose from "mongoose";

let customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8
    },
    address: {
        street: String,
        city: String,
        postalCode: String
    },
    Phone: {
        type: String,
        validate: {
            validator: v => /^\d{10}$/.test(v),
            message: 'Phone number must be 10 digits'
        }
    }
}, { timestamps: true });

export const Customer = mongoose.model("customer", customerSchema)