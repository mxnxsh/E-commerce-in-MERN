import { GET, POST, PATCH, DELETE, PUT } from '../constants/method.constant.js';

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * => This method dont work because hamne direct get method route mein pass kiya to make this function work make app.all
 */
export const getMethod = (req, res, next) => {
   switch (req.method) {
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
   switch (req.method) {
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
   switch (req.method) {
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
   switch (req.method) {
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
   switch (req.method) {
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
