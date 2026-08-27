import { Request, Response } from 'express';
import { CategoryService } from './Category.service';
import { sendResponse } from '../../utils/responseFormat';

export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    const category = await CategoryService.createCategory(req.body);
    sendResponse(res, 201, true, 'Category created successfully', category);
  }

  static async getCategories(req: Request, res: Response) {
    const categories = await CategoryService.getCategories();
    sendResponse(res, 200, true, 'Categories fetched successfully', categories);
  }

  static async getCategoryById(req: Request, res: Response) {
    const category = await CategoryService.getCategoryById(req.params.id);
    sendResponse(res, 200, true, 'Category fetched successfully', category);
  }

  static async updateCategory(req: Request, res: Response) {
    const category = await CategoryService.updateCategory(req.params.id, req.body);
    sendResponse(res, 200, true, 'Category updated successfully', category);
  }

  static async deleteCategory(req: Request, res: Response) {
    await CategoryService.deleteCategory(req.params.id);
    sendResponse(res, 200, true, 'Category deleted successfully');
  }
}
