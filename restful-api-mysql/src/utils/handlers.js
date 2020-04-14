exports.serverError = (res) => (err) => {
  console.log(err);
  res.status(500).send({
    error: {
      msg: err.message,
    },
    msg: 'Cannot process response at the time. Please try again shortly.',
  });
};
