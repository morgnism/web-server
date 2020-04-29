const escape = require('mysql').escape;

/**
 * Escape all request body values so mysql is happy.
 *
 * @example
 * {
 *    username: 'admin',
 *    password: 'password'
 *    email: 'admin@example.com'
 * }
 *
 * This will reassign values on the body object wil new values.
 */
module.exports = (body) => {
  return Object.keys(body).reduce((acc, key) => {
    acc[key] = escape(body[key]);
    return acc;
  }, {});
};
