import { Router } from 'express';
import { OrdersController } from './Orders.controller';
import { authenticate, authorizeRole } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../middlewares/asyncHandler.middleware';

const router = Router();

// Customer routes
router.post('/', authenticate, asyncHandler(OrdersController.createOrder));
router.get('/my-orders', authenticate, asyncHandler(OrdersController.getUserOrders));
router.get('/:id', authenticate, asyncHandler(OrdersController.getOrderById));

// Admin routes
router.get('/', authenticate, authorizeRole('ADMIN'), asyncHandler(OrdersController.getAllOrders));
router.put('/:id/status', authenticate, authorizeRole('ADMIN'), asyncHandler(OrdersController.updateOrderStatus));

export default router;
