exports.serverError = (res) => (err) => {
  console.log(err);
  res.status(500).json({
    error: {
      msg: err.message,
    },
    msg: 'Cannot process response at the time. Please try again shortly.',
  });
};
