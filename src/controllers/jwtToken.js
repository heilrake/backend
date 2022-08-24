import jwt from'jsonwebtoken';
import  secretKey  from '../config.js';

const generateAccessToken = (id, roles) => {
   const payload = {
      id,
      roles
   }
   return jwt.sign(payload, secretKey, { expiresIn: "24h" })
};

export default generateAccessToken;