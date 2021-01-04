import express from 'express';
import data from '../data.js'

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send(data.products)
});
router.get('/:id', (req, res) => {
  try {
    const product = data.products.find(x => x._id === req.params.id);
    product ? res.status(200).send(product) : res.status(404).send({ message: 'Product Not Found' })
  } catch (error) {
    res.status(512).send(error)
  }
});


export default router