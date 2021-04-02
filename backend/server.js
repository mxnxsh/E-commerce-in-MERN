import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});


app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
  res.send('Hello word')
})
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is connected on http://localhost:${PORT}`);
});