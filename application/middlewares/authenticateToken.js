import jwt from 'jsonwebtoken';
import CustomError from '../errors/CustomError';
import appConfig from '../../config/appConfig';

export default async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split('Bearer ')[1];

    if (!token) {
      next(new CustomError('Access denied', 401));
    }

    await jwt.verify(token, appConfig.jwtSecret);

    next();
  } catch (error) {
    if (error.message === 'invalid token') {
      next(new CustomError('Invalid Token', 401))
    }
    next(error);
  }
};
