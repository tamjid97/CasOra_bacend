import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { UsersService } from './Users.service';
import { sendResponse } from '../../utils/responseFormat';

export class UsersController {
  static async getProfile(req: AuthRequest, res: Response) {
    const user = await UsersService.getProfile(req.user.id);
    sendResponse(res, 200, true, 'Profile fetched successfully', user);
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    const updatedUser = await UsersService.updateProfile(req.user.id, req.body);
    sendResponse(res, 200, true, 'Profile updated successfully', updatedUser);
  }

  static async getAllUsers(req: AuthRequest, res: Response) {
    const users = await UsersService.getAllUsers();
    sendResponse(res, 200, true, 'Users fetched successfully', users);
  }

  static async updateUserRole(req: AuthRequest, res: Response) {
    const updatedUser = await UsersService.updateUserRole(req.params.id, req.body);
    sendResponse(res, 200, true, 'User role updated successfully', updatedUser);
  }
}
