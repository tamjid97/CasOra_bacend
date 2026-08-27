import { Router } from 'express';
import { AdminController } from './Admin.controller';
import { authenticate, authorizeRole } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../middlewares/asyncHandler.middleware';

const router = Router();

router.use(authenticate, authorizeRole('ADMIN'));

router.get('/overview', asyncHandler(AdminController.getOverviewMetrics));
router.get('/recent-orders', asyncHandler(AdminController.getRecentOrders));

export default router;
