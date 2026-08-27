import { prisma } from '../../lib/prisma';
import { AppError } from '../../utils/errors';
import { ICreateOrderRequest, IUpdateOrderStatusRequest } from './Orders.interface';
import { PaymentStatus } from '@prisma/client';

export class OrdersService {
  static async createOrder(userId: string, data: ICreateOrderRequest) {
    const { items, shippingAddress, contactPhone, paymentMethod } = data;

    if (!items || items.length === 0) {
      throw new AppError(400, 'Order must contain at least one item');
    }

    // Calculate total amount and check stock
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      
      if (!product) {
        throw new AppError(404, `Product with ID ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new AppError(400, `Insufficient stock for product ${product.name}`);
      }

      totalAmount += product.price * item.quantity;
      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create Order within a transaction to ensure atomicity
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalAmount,
          shippingAddress,
          contactPhone,
          items: {
            create: orderItemsData,
          },
          payment: {
            create: {
              amount: totalAmount,
              method: paymentMethod,
              status: paymentMethod === 'COD' ? PaymentStatus.PENDING : PaymentStatus.PENDING,
            },
          },
        },
        include: {
          items: true,
          payment: true,
        },
      });

      // Update product stock
      for (const item of orderItemsData) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return order;
  }

  static async getUserOrders(userId: string) {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: { select: { name: true, images: true } } },
        },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getOrderById(id: string, userId: string, role: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: { select: { name: true, images: true } } },
        },
        payment: true,
        user: { select: { name: true, email: true } },
      },
    });

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    if (role !== 'ADMIN' && order.userId !== userId) {
      throw new AppError(403, 'Unauthorized access to this order');
    }

    return order;
  }

  static async updateOrderStatus(id: string, data: IUpdateOrderStatusRequest) {
    const order = await prisma.order.findUnique({ where: { id } });
    
    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    return await prisma.order.update({
      where: { id },
      data: { status: data.status },
      include: { user: { select: { email: true, name: true } } },
    });
  }

  static async getAllOrders() {
    return await prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
