export interface ICreateReviewRequest {
  productId: string;
  rating: number; // 1 to 5
  comment?: string;
}

export interface IUpdateReviewRequest {
  rating?: number;
  comment?: string;
}
