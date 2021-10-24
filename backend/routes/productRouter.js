import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import * as fs from 'fs';
import path from 'path';

import Product from '../models/productModel.js';
import data from '../data.js'
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js'
const productRouter = express.Router();


productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const seller = req.query.seller || '';
    const category = req.query.category || '';
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;
    const order = req.query.order || ''
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

    }).populate(
      'seller',
      'seller.name seller.logo'
    ).sort(sortOrder);
    try {
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(512).send(error.message);
    }
  })
);
productRouter.get('/categories', expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Product.find().distinct('category');
    res.status(200).send(categories)
  } catch (error) {
    console.log(error);
    res.status(512).send(error.message);
  }
}))
productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    try {
      await Product.deleteMany({});
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
    const product = await Product.findById(req.params.id).populate(
      'seller',
      'seller.name seller.logo seller.rating seller.numReviews'
    );;
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
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({ ...req.body, seller: req.user._id });
    const createdProduct = await product.save()
    // console.log(createdProduct);
    res.send({ message: 'Product Created', product: createdProduct });
  })
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
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {

      const __dirname = path.resolve();
      const deleteProduct = await product.remove();
      try {
        fs.unlinkSync(__dirname + deleteProduct.image);
      } catch (error) {
        console.error(error.message)
      }
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
export default productRouter