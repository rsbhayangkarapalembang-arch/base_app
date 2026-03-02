const logger = require('../config/logger');

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  logger.error(err.message);

  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
