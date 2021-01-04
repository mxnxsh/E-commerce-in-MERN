import express from 'express';
import data from './data.js'

const app = express();
const PORT = process.env.PORT || 5000;
import productRoute from './routes/productRoute.js'
app.use('/api/products', productRoute)

app.get('/', (req, res) => {
  res.send('Hello word')
})
app.listen(PORT, () => {
  console.log(`Server is connected on http://localhost:${PORT}`);
});