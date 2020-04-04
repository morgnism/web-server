const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');

const userRoutes = express.Router();

userRoutes.get('/me', userController.getMe); // /api/user/me

userRoutes.post('/me/update', verifyToken, authController.updateUser);

module.exports = userRoutes;
