const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/ApiError');
const { hashPassword } = require('../utils/password');
const userRepository = require('../repositories/user.repository');

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const getAllUsers = async () => {
  const users = await userRepository.findAll();
  return users.map(sanitizeUser);
};

const getUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return sanitizeUser(user);
};

const createUser = async ({ name, email, password }) => {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  const user = await userRepository.create({
    id: uuidv4(),
    name,
    email,
    password: await hashPassword(password),
  });

  return sanitizeUser(user);
};

const updateUser = async (id, payload) => {
  const existingUser = await userRepository.findById(id);
  if (!existingUser) {
    throw new ApiError(404, 'User not found');
  }

  if (payload.email && payload.email !== existingUser.email) {
    const emailUser = await userRepository.findByEmail(payload.email);
    if (emailUser) {
      throw new ApiError(409, 'Email already registered');
    }
  }

  const data = { ...payload };
  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const updated = await userRepository.updateById(id, data);
  return sanitizeUser(updated);
};

const deleteUser = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  await userRepository.deleteById(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
