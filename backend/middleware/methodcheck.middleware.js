export const GET = (req, res, next) => {
   switch (req.method.toLowerCase()) {
      case 'get':
         next();
         break;
      default:
         res.status(404).send({
            message: 'Only Get method allowed.',
         });
         break;
   }
};
export const POST = (req, res, next) => {
   switch (req.method.toLowerCase()) {
      case 'post':
         next();
         break;
      default:
         res.status(404).send({
            message: 'Only post method allowed.',
         });
         break;
   }
};
export const PUT = (req, res, next) => {
   switch (req.method.toLowerCase()) {
      case 'put':
         next();
         break;
      default:
         res.status(404).send({
            message: 'Only put method allowed.',
         });
         break;
   }
};
export const PATCH = (req, res, next) => {
   switch (req.method.toLowerCase()) {
      case 'patch':
         next();
         break;
      default:
         res.status(404).send({
            message: 'Only patch method allowed.',
         });
         break;
   }
};
export const DELETE = (req, res, next) => {
   switch (req.method.toLowerCase()) {
      case 'delete':
         next();
         break;
      default:
         res.status(404).send({
            message: 'Only delete method allowed.',
         });
         break;
   }
};
