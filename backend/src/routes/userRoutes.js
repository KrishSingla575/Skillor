const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth, optionalAuth } = require('../middleware/authMiddleware');

router.get('/portfolio', optionalAuth, userController.getPortfolio);
router.get('/', optionalAuth, userController.getUsers);
router.get('/:id', optionalAuth, userController.getUserById);
router.put('/profile', requireAuth, userController.updateProfile);

module.exports = router;
