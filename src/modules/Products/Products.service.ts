import { prisma } from '../../lib/prisma';
import { AppError } from '../../utils/errors';
import { ICreateProductRequest, IUpdateProductRequest, IProductQuery } from './Products.interface';
import { Prisma } from '@prisma/client';

export class ProductsService {
  static async createProduct(data: ICreateProductRequest) {
    return await prisma.product.create({
      data,
    });
  }

  static async getProducts(query: IProductQuery) {
    const { search, material, minPrice, maxPrice, categoryId, page = '1', limit = '10' } = query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (material) {
      where.material = material;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          category: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  static async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: { name: true },
            },
          },
        },
      },
    });

    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    return product;
  }

  static async updateProduct(id: string, data: IUpdateProductRequest) {
    const product = await prisma.product.findUnique({ where: { id } });
    
    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  static async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    
    if (!product) {
      throw new AppError(404, 'Product not found');
    }

    return await prisma.product.delete({
      where: { id },
    });
  }
}
