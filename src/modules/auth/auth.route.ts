import { Router } from 'express';
import { AuthController } from './auth.controller';
import { asyncHandler } from '../../middlewares/asyncHandler.middleware';

const router = Router();

router.post('/register', asyncHandler(AuthController.register));
router.post('/login', asyncHandler(AuthController.login));

export default router;
