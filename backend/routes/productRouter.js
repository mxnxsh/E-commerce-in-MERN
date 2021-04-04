import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';
import data from '../data.js'

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


export default productRouter