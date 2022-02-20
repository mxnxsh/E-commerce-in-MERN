import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import * as fs from 'fs';
import path from 'path';

import Product from '../models/productModel.js';
import data from '../data.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import { getProduct, seedProduct } from '../controllers/product.controllers.js';
import MailService from './../services/mail.service.js';
import { payOrderEmailTemplate } from '../templates/payOrderEmail.template.js';

const productRouter = express.Router();

productRouter.get('/', getProduct);
productRouter.get(
   '/categories',
   expressAsyncHandler(async (req, res) => {
      try {
         const categories = await Product.find().distinct('category');
         res.status(200).send(categories);
      } catch (error) {
         console.log(error);
         res.status(512).send(error.message);
      }
   }),
);
productRouter.get('/seed', seedProduct);

productRouter.get(
   '/:id',
   expressAsyncHandler(async (req, res) => {
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
   }),
);
productRouter.post(
   '/',
   isAuth,
   isSellerOrAdmin,
   expressAsyncHandler(async (req, res) => {
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
   }),
);
productRouter.put(
   '/:id',
   isAuth,
   isSellerOrAdmin,
   expressAsyncHandler(async (req, res) => {
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
   }),
);
productRouter.delete(
   '/:id',
   isAuth,
   isAdmin,
   expressAsyncHandler(async (req, res) => {
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
   }),
);
productRouter.post(
   '/:id/reviews',
   isAuth,
   expressAsyncHandler(async (req, res) => {
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
   }),
);
export default productRouter;
