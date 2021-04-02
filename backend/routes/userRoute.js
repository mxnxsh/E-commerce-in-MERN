import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.deleteMany({});
    try {
      const createdUsers = await User.insertMany(data.users);
      res.send({ createdUsers });
    } catch (error) {
      console.log(error);
      res.status(512).send(error.message);
    }
  })
);
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    // await User.deleteMany({});
    const user = await User.findOne({ email: req.body.email });
    try {
      const { _id, name, email, password, isAdmin } = user
      if (user) {
        if (bcrypt.compareSync(req.body.password, password)) {
          res.status(200).send({
            _id,
            name,
            email,
            isAdmin,
            token: generateToken(user)
          })
        } else {
          res.status(401).send({ message: 'Invalid email and password' })
        }
      }
    } catch (error) {
      console.log(error);
      res.status(512).send(error.message);
    }
  })
);

export default userRouter;