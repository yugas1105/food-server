const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    validate: {
      validator: v => /^\d{10}$/.test(v),
      message: 'Phone number must be 10 digits'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);



//Food Schema
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    enum: ['appetizer', 'main-course', 'dessert', 'beverage']
  },
  image: String,
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);


//Order Schema

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  items: [{
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
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
  },
  deliveryAddress: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);



//review schema
const reviewSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
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
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);

