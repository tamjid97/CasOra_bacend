import { prisma } from '../../lib/prisma';
import { AppError } from '../../utils/errors';
import { PaymentStatus } from '@prisma/client';
import { IProcessPaymentRequest, IStripeWebhookEvent } from './payments.interface';

export class PaymentsService {
  static async processPayment(data: IProcessPaymentRequest) {
    const { orderId } = data;
    
    const payment = await prisma.payment.findUnique({
      where: { orderId },
      include: { order: true },
    });

    if (!payment) {
      throw new AppError(404, 'Payment record not found for this order');
    }

    if (payment.status === PaymentStatus.COMPLETED) {
      throw new AppError(400, 'Payment is already completed');
    }

    if (payment.method === 'COD') {
      // COD is usually collected at delivery, but we can simulate processing
      return await prisma.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.PENDING },
      });
    }

    if (payment.method === 'STRIPE') {
      // SIMULATION: In a real world scenario, you would create a Stripe PaymentIntent here
      // and return the client_secret to the frontend.
      // For this simulated API, we will just simulate a successful processing
      const transactionId = `pi_sim_${Math.random().toString(36).substring(7)}`;
      
      return await prisma.payment.update({
        where: { id: payment.id },
        data: { 
          transactionId,
          // usually updated by webhook, but for sim:
          // status: PaymentStatus.COMPLETED
        },
      });
    }

    throw new AppError(400, 'Unsupported payment method');
  }

  static async handleWebhook(event: IStripeWebhookEvent) {
    // Simulated Stripe Webhook handler
    if (event.type === 'payment_intent.succeeded') {
      const orderId = event.data.object.metadata?.orderId;
      if (orderId) {
        await prisma.payment.update({
          where: { orderId },
          data: { status: PaymentStatus.COMPLETED },
        });

        // Optionally update order status
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'PROCESSING' },
        });
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const orderId = event.data.object.metadata?.orderId;
      if (orderId) {
        await prisma.payment.update({
          where: { orderId },
          data: { status: PaymentStatus.FAILED },
        });
      }
    }

    return { received: true };
  }
}
