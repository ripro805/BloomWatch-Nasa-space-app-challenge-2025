/**
 * Custom error classes and error handling utilities
 */

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message) {
    super(message, 409);
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500);
  }
}

/**
 * Async error wrapper to catch errors in async route handlers
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Handle database errors
 */
export const handleDatabaseError = (error) => {
  // PostgreSQL error codes
  const errorMap = {
    '23505': { message: 'Duplicate entry. This record already exists.', statusCode: 409 },
    '23503': { message: 'Referenced record not found.', statusCode: 404 },
    '23502': { message: 'Required field is missing.', statusCode: 400 },
    '22P02': { message: 'Invalid data format.', statusCode: 400 },
    '23514': { message: 'Value violates check constraint.', statusCode: 400 },
  };

  const pgError = errorMap[error.code];
  if (pgError) {
    return new AppError(pgError.message, pgError.statusCode);
  }

  // Default database error
  return new DatabaseError(error.message);
};

/**
 * Format error response
 */
export const formatErrorResponse = (err, req) => {
  const response = {
    success: false,
    message: err.message || 'Internal server error',
    status: err.status || 'error'
  };

  // Add error details in development
  if (process.env.NODE_ENV === 'development') {
    response.error = {
      statusCode: err.statusCode,
      stack: err.stack,
      ...(err.code && { code: err.code })
    };
  }

  return response;
};

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  // Set defaults
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle database errors
  if (err.code && err.code.startsWith('23')) {
    err = handleDatabaseError(err);
  }

  // Log error
  console.error('Error:', {
    message: err.message,
    statusCode: err.statusCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // Send response
  const response = formatErrorResponse(err, req);
  res.status(err.statusCode).json(response);
};

export default {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  DatabaseError,
  asyncHandler,
  errorHandler,
  handleDatabaseError,
  formatErrorResponse
};
