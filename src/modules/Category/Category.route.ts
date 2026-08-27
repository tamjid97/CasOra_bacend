import { Router } from 'express';
import { CategoryController } from './Category.controller';
import { authenticate, authorizeRole } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../middlewares/asyncHandler.middleware';

const router = Router();

// Public routes
router.get('/', asyncHandler(CategoryController.getCategories));
router.get('/:id', asyncHandler(CategoryController.getCategoryById));

// Admin routes
router.post('/', authenticate, authorizeRole('ADMIN'), asyncHandler(CategoryController.createCategory));
router.put('/:id', authenticate, authorizeRole('ADMIN'), asyncHandler(CategoryController.updateCategory));
router.delete('/:id', authenticate, authorizeRole('ADMIN'), asyncHandler(CategoryController.deleteCategory));

export default router;
