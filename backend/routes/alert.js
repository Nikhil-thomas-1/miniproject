const express = require('express');
const router = express.Router();
const Alert = require('../models/alert.js');

// @route   GET /api/alerts
// @desc    Get all alerts
// @access  Public (Secure this later if needed)
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().populate('userId', 'name email'); // Fetch user details
    res.status(200).json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
