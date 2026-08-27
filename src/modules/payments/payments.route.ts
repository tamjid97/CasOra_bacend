import { Router } from 'express';
import { PaymentsController } from './payments.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { asyncHandler } from '../../middlewares/asyncHandler.middleware';

const router = Router();

// Customer process payment
router.post('/process', authenticate, asyncHandler(PaymentsController.processPayment));

// Webhook (usually no auth, uses signature verification in real world)
router.post('/webhook', asyncHandler(PaymentsController.handleWebhook));

export default router;
