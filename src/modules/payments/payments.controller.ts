import { Request, Response } from 'express';
import { PaymentsService } from './payments.service';
import { sendResponse } from '../../utils/responseFormat';

export class PaymentsController {
  static async processPayment(req: Request, res: Response) {
    const result = await PaymentsService.processPayment(req.body);
    sendResponse(res, 200, true, 'Payment processing initiated', result);
  }

  static async handleWebhook(req: Request, res: Response) {
    // In production, you would verify the Stripe signature here using raw body
    const result = await PaymentsService.handleWebhook(req.body);
    res.status(200).json(result);
  }
}
