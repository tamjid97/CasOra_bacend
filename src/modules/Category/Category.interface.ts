export interface ICreateCategoryRequest {
  name: string;
  description?: string;
}

export interface IUpdateCategoryRequest {
  name?: string;
  description?: string;
}
