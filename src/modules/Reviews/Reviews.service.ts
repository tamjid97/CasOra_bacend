import { prisma } from '../../lib/prisma';
import { AppError } from '../../utils/errors';
import { ICreateReviewRequest, IUpdateReviewRequest } from './Reviews.interface';

export class ReviewsService {
  static async addReview(userId: string, data: ICreateReviewRequest) {
    const { productId, rating, comment } = data;

    if (rating < 1 || rating > 5) {
      throw new AppError(400, 'Rating must be between 1 and 5');
    }

    // Check if product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    // Optionally check if user has purchased the product
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: { userId, status: 'DELIVERED' }
      }
    });

    if (!hasPurchased) {
      throw new AppError(403, 'You can only review products you have purchased and received');
    }

    // Check if user already reviewed
    const existingReview = await prisma.review.findFirst({
      where: { userId, productId }
    });

    if (existingReview) {
      throw new AppError(400, 'You have already reviewed this product');
    }

    return await prisma.review.create({
      data: {
        userId,
        productId,
        rating,
        comment,
      },
    });
  }

  static async getProductReviews(productId: string) {
    return await prisma.review.findMany({
      where: { productId },
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async updateReview(id: string, userId: string, data: IUpdateReviewRequest) {
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      throw new AppError(404, 'Review not found');
    }

    if (review.userId !== userId) {
      throw new AppError(403, 'You are not authorized to update this review');
    }

    return await prisma.review.update({
      where: { id },
      data,
    });
  }

  static async deleteReview(id: string, userId: string, role: string) {
    const review = await prisma.review.findUnique({ where: { id } });

    if (!review) {
      throw new AppError(404, 'Review not found');
    }

    if (role !== 'ADMIN' && review.userId !== userId) {
      throw new AppError(403, 'You are not authorized to delete this review');
    }

    return await prisma.review.delete({
      where: { id },
    });
  }
}
