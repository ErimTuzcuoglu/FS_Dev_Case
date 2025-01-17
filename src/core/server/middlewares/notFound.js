import CustomError from '@application/errors/CustomError';

export const notFound = (req, res, next) => {
  throw new CustomError(`Not Found - ${req.originalUrl}`, 404);
};
