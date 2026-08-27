import { prisma } from '../../lib/prisma';
import { AppError } from '../../utils/errors';
import { ICreateCategoryRequest, IUpdateCategoryRequest } from './Category.interface';

export class CategoryService {
  static async createCategory(data: ICreateCategoryRequest) {
    const existing = await prisma.category.findUnique({
      where: { name: data.name },
    });

    if (existing) {
      throw new AppError(400, 'Category with this name already exists');
    }

    return await prisma.category.create({
      data,
    });
  }

  static async getCategories() {
    return await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' },
    });
  }

  static async getCategoryById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          select: { id: true, name: true, price: true, images: true }
        }
      },
    });

    if (!category) {
      throw new AppError(404, 'Category not found');
    }

    return category;
  }

  static async updateCategory(id: string, data: IUpdateCategoryRequest) {
    const category = await prisma.category.findUnique({ where: { id } });
    
    if (!category) {
      throw new AppError(404, 'Category not found');
    }

    return await prisma.category.update({
      where: { id },
      data,
    });
  }

  static async deleteCategory(id: string) {
    const category = await prisma.category.findUnique({ where: { id } });
    
    if (!category) {
      throw new AppError(404, 'Category not found');
    }

    return await prisma.category.delete({
      where: { id },
    });
  }
}
