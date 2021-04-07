import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAuth } from '../utils.js';

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

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    try {
      const createdUser = await user.save();
      const { _id, name, email, isAdmin, } = createdUser
      res.send({
        _id,
        name,
        email,
        isAdmin,
        token: generateToken(createdUser),
      });
    } catch (error) {
      res.status(512).send({ message: 'Email already exist' })
    }

  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

export default userRouter;