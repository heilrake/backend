import { body } from 'express-validator';
//validator

export const registrationValidation = [
   body('username', 'Name user cannot be empty').notEmpty(),
   body('password', 'Password cannot be empty').isLength({min:4,max:20}),
];



