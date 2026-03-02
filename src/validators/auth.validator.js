const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(8).max(64).required(),
});

const userIdSchema = Joi.object({
  id: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100),
  email: Joi.string().trim().email(),
  password: Joi.string().min(8).max(64),
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  userIdSchema,
  updateUserSchema,
};
