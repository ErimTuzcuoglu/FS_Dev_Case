import bcrypt from 'bcryptjs';

export default {
  compare: async (str, hash) => await bcrypt.compare(str, hash),
  hash: async (str, salt = 10) => await bcrypt.hash(str, salt),
};
