import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import * as fs from 'fs';
import path from 'path';

import Product from '../models/productModel.js';
import data from '../data.js';
import MailService from './../services/mail.service.js';
import { payOrderEmailTemplate } from '../templates/payOrderEmail.template.js';
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

export const getAllCategories = expressAsyncHandler(async (req, res) => {
   try {
      const categories = await Product.find().distinct('category');
      res.status(200).send(categories);
   } catch (error) {
      console.log(error);
      res.status(512).send(error.message);
   }
});

export const getProductById = expressAsyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id).populate(
      'seller',
      'seller.name seller.logo seller.rating seller.numReviews',
   );
   try {
      if (product) {
         res.send(product);
      } else {
         res.status(404).send({ message: 'Product Not Found' });
      }
   } catch (error) {
      console.log(error);
      res.status(512).send(error.message);
   }
});

export const createProduct = expressAsyncHandler(async (req, res) => {
   const product = new Product({ ...req.body, seller: req.user._id });
   const createdProduct = await product.save();
   console.log(payOrderEmailTemplate);
   let mailOptions = {
      from: 'Amazona <manishchaudharyjee@gmail.com>',
      to: 'manish@valuenable.in',
      subject: 'Working Api',
   };

   let mailService = new MailService();
   let result = await mailService.sendMail(mailOptions);
   if (result.success) {
      console.log('Success');
   } else {
      console.log('Error');
   }
   res.send({ message: 'Product Created', product: createdProduct });
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
   const productId = req.params.id;
   const product = await Product.findById(productId);
   if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
   } else {
      res.status(404).send({ message: 'Product Not Found' });
   }
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id);
   console.log('Product', product);
   if (product) {
      const __dirname = path.resolve();
      const deleteProduct = await product.remove();
      try {
         fs.unlinkSync(__dirname + deleteProduct.image);
      } catch (error) {
         console.error(error.message);
      }
      res.send({ message: 'Product Deleted', product: deleteProduct });
   } else {
      res.status(404).send({ message: 'Product Not Found' });
   }
});

export const addReview = expressAsyncHandler(async (req, res) => {
   const productId = req.params.id;
   const product = await Product.findById(productId);
   if (product) {
      if (product.reviews.find(x => x.name === req.user.name)) {
         return res
            .status(400)
            .send({ message: 'You already submitted a review' });
      }
      const review = {
         name: req.user.name,
         rating: Number(req.body.rating),
         comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
         product.reviews.reduce((a, c) => c.rating + a, 0) /
         product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
         message: 'Review Created',
         review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
   } else {
      res.status(404).send({ message: 'Product Not Found' });
   }
});
export default productRouter;
