import { Request, Response } from 'express';
import { ProductsService } from './Products.service';
import { sendResponse } from '../../utils/responseFormat';

export class ProductsController {
  static async createProduct(req: Request, res: Response) {
    const product = await ProductsService.createProduct(req.body);
    sendResponse(res, 201, true, 'Product created successfully', product);
  }

  static async getProducts(req: Request, res: Response) {
    const result = await ProductsService.getProducts(req.query);
    sendResponse(res, 200, true, 'Products fetched successfully', result);
  }

  static async getProductById(req: Request, res: Response) {
    const product = await ProductsService.getProductById(req.params.id);
    sendResponse(res, 200, true, 'Product fetched successfully', product);
  }

  static async updateProduct(req: Request, res: Response) {
    const product = await ProductsService.updateProduct(req.params.id, req.body);
    sendResponse(res, 200, true, 'Product updated successfully', product);
  }

  static async deleteProduct(req: Request, res: Response) {
    await ProductsService.deleteProduct(req.params.id);
    sendResponse(res, 200, true, 'Product deleted successfully');
  }
}
