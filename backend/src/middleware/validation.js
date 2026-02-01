/**
 * Input validation middleware
 * Provides utilities for validating request data
 */

/**
 * Validate required fields in request body
 */
export const validateRequired = (fields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    for (const field of fields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    
    next();
  };
};

/**
 * Validate email format
 */
export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return next();
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }
  
  next();
};

/**
 * Validate password strength
 */
export const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (!password) {
    return next();
  }
  
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
  }
  
  next();
};

/**
 * Validate date format (YYYY-MM-DD)
 */
export const validateDate = (fieldName = 'date') => {
  return (req, res, next) => {
    const date = req.body[fieldName] || req.query[fieldName];
    
    if (!date) {
      return next();
    }
    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        success: false,
        message: `Invalid date format for ${fieldName}. Expected YYYY-MM-DD`
      });
    }
    
    next();
  };
};

/**
 * Validate numeric range
 */
export const validateRange = (fieldName, min, max) => {
  return (req, res, next) => {
    const value = parseFloat(req.body[fieldName] || req.query[fieldName]);
    
    if (isNaN(value)) {
      return next();
    }
    
    if (value < min || value > max) {
      return res.status(400).json({
        success: false,
        message: `${fieldName} must be between ${min} and ${max}`
      });
    }
    
    next();
  };
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        // Remove potential XSS patterns
        obj[key] = obj[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '');
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };
  
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);
  
  next();
};

/**
 * Validate coordinates
 */
export const validateCoordinates = (req, res, next) => {
  const { latitude, longitude } = req.body;
  
  if (latitude !== undefined) {
    const lat = parseFloat(latitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      return res.status(400).json({
        success: false,
        message: 'Latitude must be between -90 and 90'
      });
    }
  }
  
  if (longitude !== undefined) {
    const lon = parseFloat(longitude);
    if (isNaN(lon) || lon < -180 || lon > 180) {
      return res.status(400).json({
        success: false,
        message: 'Longitude must be between -180 and 180'
      });
    }
  }
  
  next();
};

/**
 * Validate pollinator zone
 */
export const validateZone = (req, res, next) => {
  const { zone } = req.body;
  
  if (!zone) {
    return next();
  }
  
  const validZones = ['healthy', 'at-risk', 'critical'];
  
  if (!validZones.includes(zone)) {
    return res.status(400).json({
      success: false,
      message: `Zone must be one of: ${validZones.join(', ')}`
    });
  }
  
  next();
};

export default {
  validateRequired,
  validateEmail,
  validatePassword,
  validateDate,
  validateRange,
  sanitizeInput,
  validateCoordinates,
  validateZone
};
