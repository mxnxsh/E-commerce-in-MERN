import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js';
const productRouter = express.Router();

export const getProduct = expressAsyncHandler(async (req, res) => {
   const name = req.query.name || '';
   const seller = req.query.seller || '';
   const category = req.query.category || '';
   const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
   const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
   const rating =
      req.query.rating && Number(req.query.rating) !== 0
         ? Number(req.query.rating)
         : 0;
   const order = req.query.order || '';
   const sellerFilter = seller ? { seller } : {};
   const categoryFilter = category ? { category } : {};
   const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
   const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
   const ratingFilter = rating ? { rating: { $gte: rating } } : {};
   const sortOrder =
      order === 'lowest'
         ? { price: 1 }
         : order === 'highest'
         ? { price: -1 }
         : order === 'toprated'
         ? { rating: -1 }
         : { _id: -1 };
   const products = await Product.find({
      ...nameFilter,
      ...sellerFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
   })
      .populate('seller', 'seller.name seller.logo')
      .sort(sortOrder);
   try {
      res.status(200).send(products);
   } catch (error) {
      console.log(error);
      res.status(512).send(error.message);
   }
});
export const seedProduct = expressAsyncHandler(async (req, res) => {
   try {
      await Product.deleteMany({});
      const createdProducts = await Product.insertMany(data.products);
      res.status(200).send({ createdProducts });
   } catch (error) {
      console.log(error);
      res.status(512).send(error.message);
   }
});
export default productRouter;
