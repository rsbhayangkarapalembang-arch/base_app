const dotenv = require('dotenv');

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
};

module.exports = env;
