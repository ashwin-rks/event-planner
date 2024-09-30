const express = require("express");
const { login, signup, validate } = require('../controller/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/validate', authenticateToken, validate);

module.exports = router;