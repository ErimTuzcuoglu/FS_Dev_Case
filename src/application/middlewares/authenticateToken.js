import AuthService from '../../core/services/AuthService';

export default async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split('Bearer ')[1];
    await AuthService.verify(token);
    next();
  } catch (error) {
    next(error);
  }
};
