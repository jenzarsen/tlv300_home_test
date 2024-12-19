import logger from '../services/logger.service.js';

export class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Log error
  logger.error('Error:', {
    url: req.url,
    method: req.method,
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode
  });

  // Handle specific error types
  if (err.name === 'ValidationError') {
    err.statusCode = 400;
    err.message = 'Invalid input data';
  }

  if (err.code === 'ECONNREFUSED') {
    err.statusCode = 503;
    err.message = 'Service temporarily unavailable';
  }

  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
    err.message = 'Token expired';
  }

  // Development vs Production error response
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
      errors: err.errors
    });
  }

  // Production error response (no stack trace)
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational ? err.message : 'Something went wrong',
    errors: err.errors?.length ? err.errors : undefined
  });
};

// Async handler wrapper to avoid try-catch blocks
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}; 