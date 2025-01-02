import CustomError from '../../errors/CustomError';
import bcrypt from 'bcryptjs';

export default async function signUp(userDTO) {
  const {
    name,
    email,
    password,
    userRepository,
  } = userDTO;
  if (!name || !email || !password) {
    throw new Error('Some fields are empty or not found!');
  }

  const user = await userRepository.findBy({ email });
  if (user && user.length > 0) {
    throw new CustomError('Email already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    hashedPassword,
  };

  return userRepository.signUp(newUser);
}
