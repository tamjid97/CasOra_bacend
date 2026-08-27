export interface IStripeWebhookEvent {
  type: string;
  data: {
    object: {
      id: string;
      metadata?: {
        orderId: string;
      };
      status?: string;
    };
  };
}

export interface IProcessPaymentRequest {
  orderId: string;
  paymentMethodId?: string; // For Stripe integration
}
