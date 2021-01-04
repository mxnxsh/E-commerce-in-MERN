import express from 'express';
import data from './data.js'
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/products', (req, res) => {
  res.status(200).send(data.products)
})

app.get('/', (req, res) => {
  res.send('Hello word')
})
app.listen(PORT, () => {
  console.log(`Server is connected on http://localhost:${PORT}`);
});