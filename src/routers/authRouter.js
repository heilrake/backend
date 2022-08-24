import  Router from 'express';
import { roleMiddleware } from '../middleware/index.js';

// const roleMiddleware = require('../middleware/roleMiddleware');
// const authMiddleware = require('../middleware/authMiddleware');
// const controller = require('../controllers/authController');
import { getUsers, login, registration } from '../../controllers/authController.js';
import { registrationValidation } from'../validators/registrationValidation.js';

const router = new Router();

router.post('/registration',registrationValidation,  registration);
router.post('/login',login);
router.get('/users',roleMiddleware(['USER']), getUsers);

export default router;