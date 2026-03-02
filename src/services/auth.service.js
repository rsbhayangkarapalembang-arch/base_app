const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/ApiError');
const { hashPassword, comparePassword } = require('../utils/password');
const userRepository = require('../repositories/user.repository');

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const register = async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  const hashedPassword = await hashPassword(password);
  const user = await userRepository.create({
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
  });

  return sanitizeUser(user);
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return sanitizeUser(user);
};

module.exports = {
  register,
  login,
};
