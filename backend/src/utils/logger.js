/**
 * Logger utility for consistent logging across the application
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const getTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Info log
 */
export const info = (message, data = null) => {
  console.log(
    `${colors.cyan}[INFO]${colors.reset} ${getTimestamp()} - ${message}`,
    data ? data : ''
  );
};

/**
 * Success log
 */
export const success = (message, data = null) => {
  console.log(
    `${colors.green}[SUCCESS]${colors.reset} ${getTimestamp()} - ${message}`,
    data ? data : ''
  );
};

/**
 * Warning log
 */
export const warn = (message, data = null) => {
  console.warn(
    `${colors.yellow}[WARN]${colors.reset} ${getTimestamp()} - ${message}`,
    data ? data : ''
  );
};

/**
 * Error log
 */
export const error = (message, err = null) => {
  console.error(
    `${colors.red}[ERROR]${colors.reset} ${getTimestamp()} - ${message}`
  );
  if (err) {
    console.error(err);
  }
};

/**
 * Debug log (only in development)
 */
export const debug = (message, data = null) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `${colors.magenta}[DEBUG]${colors.reset} ${getTimestamp()} - ${message}`,
      data ? data : ''
    );
  }
};

/**
 * API request log
 */
export const request = (method, url, statusCode = null) => {
  const statusColor = statusCode >= 400 ? colors.red : colors.green;
  console.log(
    `${colors.blue}[API]${colors.reset} ${getTimestamp()} - ${method} ${url}${
      statusCode ? ` ${statusColor}${statusCode}${colors.reset}` : ''
    }`
  );
};

/**
 * Database query log
 */
export const query = (sql, duration = null) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `${colors.cyan}[DB]${colors.reset} ${getTimestamp()} - ${sql.substring(0, 100)}${
        sql.length > 100 ? '...' : ''
      }${duration ? ` (${duration}ms)` : ''}`
    );
  }
};

export default {
  info,
  success,
  warn,
  error,
  debug,
  request,
  query
};
