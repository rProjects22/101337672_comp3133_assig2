const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

//route for user login
router.post('/login', authService.login);

//route for user signup
router.post('/signup', authService.signup);

module.exports = router;
