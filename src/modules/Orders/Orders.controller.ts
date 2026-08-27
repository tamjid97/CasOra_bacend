import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { OrdersService } from './Orders.service';
import { sendResponse } from '../../utils/responseFormat';

export class OrdersController {
  static async createOrder(req: AuthRequest, res: Response) {
    const order = await OrdersService.createOrder(req.user.id, req.body);
    sendResponse(res, 201, true, 'Order placed successfully', order);
  }

  static async getUserOrders(req: AuthRequest, res: Response) {
    const orders = await OrdersService.getUserOrders(req.user.id);
    sendResponse(res, 200, true, 'Orders fetched successfully', orders);
  }

  static async getOrderById(req: AuthRequest, res: Response) {
    const order = await OrdersService.getOrderById(req.params.id, req.user.id, req.user.role);
    sendResponse(res, 200, true, 'Order fetched successfully', order);
  }

  static async updateOrderStatus(req: AuthRequest, res: Response) {
    const order = await OrdersService.updateOrderStatus(req.params.id, req.body);
    sendResponse(res, 200, true, 'Order status updated successfully', order);
  }

  static async getAllOrders(req: AuthRequest, res: Response) {
    const orders = await OrdersService.getAllOrders();
    sendResponse(res, 200, true, 'All orders fetched successfully', orders);
  }
}
