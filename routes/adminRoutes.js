const express = require('express');
const { createUser } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Only logged-in professors/admins can create accounts
router.post('/create-user', protect, authorize('professor', 'admin'), createUser);

module.exports = router;
