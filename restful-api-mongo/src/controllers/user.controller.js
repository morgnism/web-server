const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.getMe = async (req, res) => {
  res.send(req.user);
};

exports.updateMe = async function (req, res) {
  // try {
  //   const user = new User(req.body);
  //   await user.save();
  //   const token = await user.generateAuthToken();
  //   res.status(201).send({ user, token });
  // } catch (error) {
  //   res.status(400).send(error);
  // }
};
