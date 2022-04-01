import express from 'express';
import {
   getProduct,
   seedProduct,
   getAllCategories,
   getProductById,
   createProduct,
   updateProduct,
   deleteProduct,
   addReview,
} from '../controllers/product.controllers.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', getProduct);
productRouter.get('/categories', getAllCategories);
productRouter.get('/seed', seedProduct);

productRouter.get('/:id', getProductById);
productRouter.post('/', isAuth, isSellerOrAdmin, createProduct);
productRouter.put('/:id', isAuth, isSellerOrAdmin, updateProduct);
productRouter.delete('/:id', isAuth, isAdmin, deleteProduct);
productRouter.post('/:id/reviews', isAuth, addReview);
export default productRouter;
