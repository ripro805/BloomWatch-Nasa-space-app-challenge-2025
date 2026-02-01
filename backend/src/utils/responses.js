/**
 * Standardized API response utilities
 */

/**
 * Success response
 */
export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

/**
 * Created response (201)
 */
export const createdResponse = (res, data, message = 'Resource created successfully') => {
  return successResponse(res, data, message, 201);
};

/**
 * No content response (204)
 */
export const noContentResponse = (res) => {
  return res.status(204).send();
};

/**
 * Paginated response
 */
export const paginatedResponse = (res, data, page, limit, total) => {
  return res.json({
    success: true,
    data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: parseInt(total),
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    },
    timestamp: new Date().toISOString()
  });
};

/**
 * Error response
 */
export const errorResponse = (res, message, statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  if (errors) {
    response.errors = errors;
  }

  if (process.env.NODE_ENV === 'development') {
    response.statusCode = statusCode;
  }

  return res.status(statusCode).json(response);
};

/**
 * Validation error response
 */
export const validationErrorResponse = (res, errors) => {
  return errorResponse(res, 'Validation failed', 400, errors);
};

/**
 * Not found response
 */
export const notFoundResponse = (res, resource = 'Resource') => {
  return errorResponse(res, `${resource} not found`, 404);
};

/**
 * Unauthorized response
 */
export const unauthorizedResponse = (res, message = 'Authentication required') => {
  return errorResponse(res, message, 401);
};

/**
 * Forbidden response
 */
export const forbiddenResponse = (res, message = 'Insufficient permissions') => {
  return errorResponse(res, message, 403);
};

/**
 * Conflict response
 */
export const conflictResponse = (res, message = 'Resource already exists') => {
  return errorResponse(res, message, 409);
};

/**
 * Too many requests response
 */
export const tooManyRequestsResponse = (res, message = 'Too many requests') => {
  return errorResponse(res, message, 429);
};

export default {
  successResponse,
  createdResponse,
  noContentResponse,
  paginatedResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse,
  conflictResponse,
  tooManyRequestsResponse
};
