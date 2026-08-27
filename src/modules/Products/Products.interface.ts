import { MaterialType } from '@prisma/client';

export interface ICreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  material: MaterialType;
  categoryId: string;
}

export interface IUpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  images?: string[];
  material?: MaterialType;
  categoryId?: string;
}

export interface IProductQuery {
  search?: string;
  material?: MaterialType;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
  page?: string;
  limit?: string;
}
