import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
})

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    countInStock: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    numReviews: {
      type: Number,
      default: 0
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;