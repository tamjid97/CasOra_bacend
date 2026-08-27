import { Router } from 'express';
import { ProductsController } from './Products.controller';
import { authenticate, authorizeRole } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../middlewares/asyncHandler.middleware';

const router = Router();

// Public routes
router.get('/', asyncHandler(ProductsController.getProducts));
router.get('/:id', asyncHandler(ProductsController.getProductById));

// Admin routes
router.post('/', authenticate, authorizeRole('ADMIN'), asyncHandler(ProductsController.createProduct));
router.put('/:id', authenticate, authorizeRole('ADMIN'), asyncHandler(ProductsController.updateProduct));
router.delete('/:id', authenticate, authorizeRole('ADMIN'), asyncHandler(ProductsController.deleteProduct));

export default router;
