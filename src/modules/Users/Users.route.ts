import { Router } from 'express';
import { UsersController } from './Users.controller';
import { authenticate, authorizeRole } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../middlewares/asyncHandler.middleware';

const router = Router();

// Customer routes
router.get('/profile', authenticate, asyncHandler(UsersController.getProfile));
router.put('/profile', authenticate, asyncHandler(UsersController.updateProfile));

// Admin routes
router.get('/', authenticate, authorizeRole('ADMIN'), asyncHandler(UsersController.getAllUsers));
router.put('/:id/role', authenticate, authorizeRole('ADMIN'), asyncHandler(UsersController.updateUserRole));

export default router;
