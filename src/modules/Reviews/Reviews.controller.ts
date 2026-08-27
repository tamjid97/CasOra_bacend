import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { ReviewsService } from './Reviews.service';
import { sendResponse } from '../../utils/responseFormat';

export class ReviewsController {
  static async addReview(req: AuthRequest, res: Response) {
    const review = await ReviewsService.addReview(req.user.id, req.body);
    sendResponse(res, 201, true, 'Review added successfully', review);
  }

  static async getProductReviews(req: Request, res: Response) {
    const reviews = await ReviewsService.getProductReviews(req.params.productId);
    sendResponse(res, 200, true, 'Reviews fetched successfully', reviews);
  }

  static async updateReview(req: AuthRequest, res: Response) {
    const review = await ReviewsService.updateReview(req.params.id, req.user.id, req.body);
    sendResponse(res, 200, true, 'Review updated successfully', review);
  }

  static async deleteReview(req: AuthRequest, res: Response) {
    await ReviewsService.deleteReview(req.params.id, req.user.id, req.user.role);
    sendResponse(res, 200, true, 'Review deleted successfully');
  }
}
