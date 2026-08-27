import { Request, Response } from 'express';
import { AdminService } from './Admin.service';
import { sendResponse } from '../../utils/responseFormat';

export class AdminController {
  static async getOverviewMetrics(req: Request, res: Response) {
    const metrics = await AdminService.getOverviewMetrics();
    sendResponse(res, 200, true, 'Overview metrics fetched successfully', metrics);
  }

  static async getRecentOrders(req: Request, res: Response) {
    const orders = await AdminService.getRecentOrders();
    sendResponse(res, 200, true, 'Recent orders fetched successfully', orders);
  }
}
