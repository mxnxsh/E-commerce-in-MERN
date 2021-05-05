import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';
import data from '../data.js'
import { isAdmin, isAuth } from '../utils.js'
const productRouter = express.Router();


productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    try {
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(512).send(error.message);
    }
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    try {
      // await Product.deleteMany({});
      const createdProducts = await Product.insertMany(data.products);
      res.status(200).send({ createdProducts });
    } catch (error) {
      console.log(error);
      res.status(512).send(error.message);
    }
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
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

  })
);
productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const product = new Product({
      name: 'samle name ' + Date.now(),
      image: '/images/shirt1.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    }); const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);

export default productRouter