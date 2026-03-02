const bcrypt = require('bcrypt');
const env = require('../config/env');

const hashPassword = (plainPassword) => bcrypt.hash(plainPassword, env.bcryptSaltRounds);
const comparePassword = (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword);

module.exports = {
  hashPassword,
  comparePassword,
};
