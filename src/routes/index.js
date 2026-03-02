const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'OK' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
