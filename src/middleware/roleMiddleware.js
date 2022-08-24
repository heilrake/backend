import jwt from 'jsonwebtoken';
import secretKey from '../../config.js';



const  roleMiddleware = (roles) => {
   return function (req, res, next) {
      if (req.method === 'OPTIONS') {
         next(); // по цепочці викликаємо настіпні middleware
      }
      try {
         const token = req.headers.authorization.split(' ')[1];
         if (!token) {
            return res.status(403).json({ message: "User isn't authorization" });
         }
         const { roles: userRoles } = jwt.verify(token, secretKey);

         let hasRole = false;

         // // userRoles.some(function (role) 
         userRoles.forEach(role => {
            if (roles.includes(role)) {
               hasRole = true;
            }
         });

         if (!hasRole) {
            return res.status(403).json({message: "У вас нет доступа"})
         };
         next();
      } catch (error) {
         console.log(error);
         return res.status(403).json({message:"User isn't authorization"})
      }
   }
};
export default roleMiddleware;
