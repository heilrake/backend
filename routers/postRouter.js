import Router from 'express';
import { create, getAll, getLastTags, getOne, remove } from '../controllers/postController.js';

import checkAuth from'../middleware/authMiddleware.js';
import { postCreateValidation } from '../validators/postValidation.js';
const router = new Router();

// app.get('/posts', PostController.getAll);
// app.get('/posts/tags', PostController.getLastTags);
// app.get('/posts/:id', PostController.getOne);
// app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
// app.delete('/posts/:id', checkAuth, PostController.remove);

router.get('/post', getAll);
router.get('/posts/tags', getLastTags);
router.get('/posts/:id', getOne);
router.post('/posts', checkAuth,postCreateValidation, create);
router.delete('/posts/:id', checkAuth, remove);

export default router;