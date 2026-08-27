import { prisma } from '../../lib/prisma';
import { AppError } from '../../utils/errors';
import { IUpdateProfileRequest, IUpdateUserRoleRequest } from './Users.interface';

export class UsersService {
  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        city: true,
        zipCode: true,
        country: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return user;
  }

  static async updateProfile(userId: string, data: IUpdateProfileRequest) {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        city: true,
        zipCode: true,
        country: true,
        role: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  static async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  static async updateUserRole(userId: string, data: IUpdateUserRoleRequest) {
    return await prisma.user.update({
      where: { id: userId },
      data: { role: data.role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }
}
