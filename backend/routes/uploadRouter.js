import multer from 'multer';
import express from 'express';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
// import config from '../config';
import { isAuth } from '../utils.js';
// console.log(config.accessKeyId);
const uploadRouter = express.Router();

const storage = multer.diskStorage({
   destination(req, file, cb) {
      cb(null, 'uploads/');
   },
   filename(req, file, cb) {
      cb(null, `${Date.now()}.jpg`);
   },
});

const upload = multer({ storage });

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
   res.send(`/${req.file.path}`);
});

const s3 = new aws.S3();
const storageS3 = multerS3({
   s3,
   bucket: 'testing-learn-bucket',
   acl: 'public-read',
   contentType: multerS3.AUTO_CONTENT_TYPE,
   key(req, file, cb) {
      cb(null, file.originalname);
   },
});
const uploadS3 = multer({ storage: storageS3 });
uploadRouter.post('/s3', uploadS3.single('image'), (req, res) => {
   res.send(req.file.location);
});

export default uploadRouter;
