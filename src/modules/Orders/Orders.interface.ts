import { OrderStatus, PaymentMethod } from '@prisma/client';

export interface IOrderItemRequest {
  productId: string;
  quantity: number;
}

export interface ICreateOrderRequest {
  items: IOrderItemRequest[];
  shippingAddress: string;
  contactPhone: string;
  paymentMethod: PaymentMethod;
}

export interface IUpdateOrderStatusRequest {
  status: OrderStatus;
}
