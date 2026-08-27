import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { sendResponse } from '../../utils/responseFormat';

export class AuthController {
  static async register(req: Request, res: Response) {
    const user = await AuthService.register(req.body);
    sendResponse(res, 201, true, 'User registered successfully', user);
  }

  static async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);
    sendResponse(res, 200, true, 'User logged in successfully', result);
  }
}
