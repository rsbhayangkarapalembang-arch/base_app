const app = require('./app');
const env = require('./config/env');
const logger = require('./config/logger');
const prisma = require('./config/prisma');

const server = app.listen(env.port, () => {
  logger.info(`Server running on port ${env.port}`);
});

const gracefulShutdown = async () => {
  logger.info('Shutting down server...');
  await prisma.$disconnect();
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
