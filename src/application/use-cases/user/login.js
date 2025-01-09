import jwt from 'jsonwebtoken';
import CustomError from '@application/errors/CustomError';
import appConfig from '@config/appConfig';
import CryptService from '@core/services/CryptService';

export default async function login(userDTO) {
  const {
    email,
    password,
    userRepository,
  } = userDTO;
  if (!email || !password) {
    throw new Error('Some fields are empty or not found!');
  }

  const user = await userRepository.findBy({email});
  if (!user) {
    throw new CustomError('User not found', 400);
  }

  // userRepository.updateById(id, updatedUser);

  const isValidCredentials = await CryptService.compare(password, user.hashedPassword);

  if (!isValidCredentials) {
    throw new CustomError('Invalid credentials', 400);
  }
  // Generate JWT
  const token = jwt.sign({id: user.id, username: user.username}, appConfig.jwtSecret, {expiresIn: '1h'});
  const {name, subscriptions, _id, createdAt, updatedAt} = user;
  return {
    email,
    name,
    subscriptions,
    id: _id,
    createdAt,
    updatedAt,
    token,
  };
}
