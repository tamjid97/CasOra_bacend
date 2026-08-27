import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { config } from '../config';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'PrismaClientKnownRequestError') {
    statusCode = 400;
    message = 'Database request error';
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: config.env === 'development' ? err.stack : undefined,
  });
};
