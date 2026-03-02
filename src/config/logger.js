const { createLogger, format, transports } = require('winston');
const env = require('./env');

const logger = createLogger({
  level: env.nodeEnv === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ level, message, timestamp, stack }) => {
      if (stack) {
        return `[${timestamp}] ${level}: ${message} - ${stack}`;
      }
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
