const express = require('express');
const router = express.Router();

// Import route files
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Use routes
router.use('/users', userRoutes);
router.use('/posts', thoughtRoutes);

module.exports = router;