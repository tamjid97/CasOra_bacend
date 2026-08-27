import { Router } from 'express';
import { ReviewsController } from './Reviews.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../middlewares/asyncHandler.middleware';

const router = Router();

// Public routes
router.get('/product/:productId', asyncHandler(ReviewsController.getProductReviews));

// Customer routes
router.post('/', authenticate, asyncHandler(ReviewsController.addReview));
router.put('/:id', authenticate, asyncHandler(ReviewsController.updateReview));
router.delete('/:id', authenticate, asyncHandler(ReviewsController.deleteReview));

export default router;
