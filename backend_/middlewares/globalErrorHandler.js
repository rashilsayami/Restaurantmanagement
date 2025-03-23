const config = require('../config/config'); // Adjust path as needed

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: err.message || 'Internal Server Error',
    errorStack: config.nodeEnv === 'development' ? err.stack : '🤫'
  });
};

module.exports = globalErrorHandler;
