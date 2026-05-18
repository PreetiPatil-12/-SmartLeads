import express from 'express';
import { login, register,createUser } from '../controllers/auth.controller';

import { protect } from '../middleware/auth.middleware';

import { adminOnly } from '../middleware/adminMiddleware';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post(
  '/create-user',
  protect,
  adminOnly,
  createUser
);

export default router;