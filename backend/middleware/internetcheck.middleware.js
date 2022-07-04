import dns from 'dns';
export const checkInternet = (req, res, next) => {
   dns.lookup('google.com', err => {
      if (err && err.code == 'ENOTFOUND') {
         res.status(503).send({ message: 'No internet connection' });
      } else {
         next();
      }
   });
};
