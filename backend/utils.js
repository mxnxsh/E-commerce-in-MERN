import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const { _id, name, email, isAdmin } = user
  return jwt.sign(
    {
      _id,
      name,
      email,
      isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};