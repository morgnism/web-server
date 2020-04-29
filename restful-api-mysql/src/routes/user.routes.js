const express = require('express');
const { getMe, updateMe } = require('../controllers/user.controller');
const canAccess = require('../middleware/auth.middleware');
const { check } = require('express-validator');

const userRoutes = express.Router();

userRoutes.get('/me', canAccess, getMe); // /api/user/me

userRoutes.put(
  '/me/update',
  //   [check('password', 'Password needed to validate changes.').not().isEmpty()],
  canAccess,
  updateMe
);

module.exports = userRoutes;
