export const sendResponse = <T>(
  res: any,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
