import jwt from 'jsonwebtoken';
import secretKey from '../config.js';


const authMiddleware = (req, res, next)=> {
   if (req.method === 'OPTIONS') {
      next(); // по цепочці викликаємо настіпні middleware
   }
   try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
         return res.status(403).json({ message: "User isn't authorization" });
      }
      const decodedData = jwt.verify(token, secretKey); // - ? 

      req.user = decodedData;

      next();
   } catch (error) {
      console.log(error);
      return res.status(403).json({message:"User isn't authorization"})
   }
};

export default  authMiddleware
