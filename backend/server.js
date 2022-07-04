// import SocketIO from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import parser from 'ua-parser-js';

import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import uploadRouter from './routes/uploadRouter.js';
import { checkInternet } from './middleware/internetcheck.middleware.js';
import { GET } from './middleware/methodcheck.middleware.js';
import morgan from 'morgan';

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// mongodb+srv://interview_db:rockstar123@cluster0.9koh3.mongodb.net/interview_db?retryWrites=true&w=majority

mongoose
   .connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
   })
   .then(() => {
      console.log(`MongoDB is connected Successfully`);
   })
   .catch(error => {
      console.log(error.message);
   });

app.use('/api/uploads', uploadRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
   res.send(process.env.GOOGLE_API_KEY || '');
});
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', checkInternet, GET, (req, res) => {
   console.log('Remote IP', req.method);
   const ua = parser(req.headers['user-agent']);
   res.status(200).send({
      message: 'Hello world',
      Remote_IPs: req.socket.remoteAddress,
      ua,
   });
});

app.use((req, res, next) => {
   const err = new Error('Not Found');
   err.status = 404;
   next(err);
});

// when status is 404, error handler
app.use((err, req, res, next) => {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
   res.status(err.status || 500);
   if (404 === err.status) {
      res.format({
         'text/plain': () => {
            res.send({ message: 'not found Data' });
         },
         'text/html': () => {
            res.render('404.jade');
         },
         'application/json': () => {
            res.send({ message: 'not found Data' });
         },
         default: () => {
            res.status(406).send('Not Acceptable');
         },
      });
   }

   // when status is 500, error handler
   if (500 === err.status) {
      return res.send({ message: 'Internal Server Error' });
   }
});
const PORT = process.env.PORT || 5000;

// const httpServer = http.Server(app);
// const io = SocketIO(httpServer);

app.listen(PORT, () => {
   console.log(`Server is connected on http://localhost:${PORT}`);
});
