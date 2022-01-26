import dotenv from 'dotenv';

dotenv.config();

export default {
   accessKeyId: process.env.ACCESS_KEY_ID || 'accessKeyId',
   secretAccessKey: process.env.SECRET_ACCESS_KEY || 'secretAccessKey',
};
