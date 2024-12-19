import logger from "../services/logger.service.js";

export class BaseError extends Error {
  constructor(name, statusCode, message, isOperational = true) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends BaseError {
    constructor(resource) {
      super('NotFoundError', 404, `${resource} not found`);
    }
  }

export class RateLimitError extends BaseError {
  constructor() {
    super("RateLimitError", 429, "Too many requests");
  }
}

export class ValidationError extends BaseError {
  constructor(message) {
    super("ValidationError", 400, message);
    this.errors = [];
  }
}

export class ApiServiceError extends BaseError {
  constructor(message) {
    super("ApiServiceError", 503, message);
  }
}

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Log error
  logger.error("Error:", {
    url: req.url,
    method: req.method,
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
  });

//   if (err.code === "ECONNREFUSED") {
//     err.statusCode = 503;
//     err.message = "Service temporarily unavailable";
//   }

//   if (err.name === "TokenExpiredError") {
//     err.statusCode = 401;
//     err.message = "Token expired";
//   }

  // Development vs Production error response
  if (process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
      errors: err.errors,
    });
  }

  // Production error response (no stack trace)
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.isOperational ? err.message : "Something went wrong",
    errors: err.errors?.length ? err.errors : undefined,
  });
};

// Async handler wrapper to avoid try-catch blocks
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
