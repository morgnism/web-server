// ************************************
// ERROR-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

/**
 * Handle req that would produce a 404 status code and respons accordingly.
 */
exports.error404 = function (req, res, next) {
  next({ msg: 'Not Found', status: 404 });
};

/**
 * Handle req that would produce a 500 status code and respons accordingly.
 */
exports.error500 = function (error, req, res, next) {
  res.status(error.status || 500).json({
    error: {
      msg: error.message,
    },
  });
};

exports.logger = function (port) {
  return function () {
    console.log(`Running on port: ${port}...`);
  };
};
