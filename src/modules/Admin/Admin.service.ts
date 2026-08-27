import { prisma } from '../../lib/prisma';

export class AdminService {
  static async getOverviewMetrics() {
    const [
      totalOrders,
      pendingOrders,
      totalUsers,
      totalProducts,
      outOfStockProducts,
      completedPayments,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.product.count(),
      prisma.product.count({ where: { stock: { lte: 0 } } }),
      prisma.payment.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalSales: completedPayments._sum.amount || 0,
      totalOrders,
      pendingOrders,
      totalUsers,
      totalProducts,
      outOfStockProducts,
    };
  }

  static async getRecentOrders() {
    return await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
      },
    });
  }
}
