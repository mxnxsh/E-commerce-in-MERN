import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import data from '../data.js';
import {
   DASHBOARD_SCREEN_ROUTE,
   OTHER_SCREEN_ROUTE,
} from '../constants/product.constants.js';
const productRouter = express.Router();

export const getProduct = expressAsyncHandler(async (req, res) => {
   console.log('Headers', req.headers.referer === OTHER_SCREEN_ROUTE);
   const pageSize = req.headers.referer === DASHBOARD_SCREEN_ROUTE ? 12 : 6;
   const page = Number(req.query.pageNumber) || 1;
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
   // const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
   const nameFilter = name
      ? {
           $or: [
              {
                 name: {
                    $regex: name,
                    $options: 'i',
                 },
              },
              {
                 description: {
                    $regex: name,
                    $options: 'i',
                 },
              },
              {
                 category: {
                    $regex: name,
                    $options: 'i',
                 },
              },
           ],
        }
      : {};
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
   const count = await Product.countDocuments({
      ...nameFilter,
      ...sellerFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
   });
   const products = await Product.find({
      ...nameFilter,
      ...sellerFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
   })
      .populate('seller', 'seller.name seller.logo')
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
   try {
      res.send({ products, page, pages: Math.ceil(count / pageSize) });
   } catch (error) {
      console.log(error);
      res.status(512).send(error.message);
   }
});
export const seedProduct = expressAsyncHandler(async (req, res) => {
   try {
      await Product.deleteMany({});
      const seller = await User.findOne({ isSeller: true });
      if (seller) {
         const products = data.products.map(product => ({
            ...product,
            seller: seller._id,
         }));
      }
      const createdProducts = await Product.insertMany(products);
      res.status(200).send({ createdProducts });
   } catch (error) {
      console.log(error);
      res.status(500).send({
         message: 'No seller found.First run /api.users/seed',
      });
   }
});
export default productRouter;
