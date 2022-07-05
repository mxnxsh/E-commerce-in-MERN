import { GET, POST, PATCH, DELETE, PUT } from '../constants/method.constant.js';

export const getMethod = (req, res, next) => {
   switch (req.method.toLowerCase()) {
      case GET:
         next();
         break;
      default:
         res.status(404).send({
            message: 'Only Get method allowed.',
         });
         break;
   }
};
export const postMethod = (req, res, next) => {
   switch (req.method.toLowerCase()) {
      case POST:
         next();
         break;
      default:
         res.status(404).send({
            message: 'Only post method allowed.',
         });
         break;
   }
};
export const putMethod = (req, res, next) => {
   switch (req.method.toLowerCase()) {
      case PUT:
         next();
         break;
      default:
         res.status(404).send({
            message: 'Only put method allowed.',
         });
         break;
   }
};
export const patchMethod = (req, res, next) => {
   switch (req.method.toLowerCase()) {
      case PATCH:
         next();
         break;
      default:
         res.status(404).send({
            message: 'Only patch method allowed.',
         });
         break;
   }
};
export const deleteMethod = (req, res, next) => {
   switch (req.method.toLowerCase()) {
      case DELETE:
         next();
         break;
      default:
         res.status(404).send({
            message: 'Only delete method allowed.',
         });
         break;
   }
};
