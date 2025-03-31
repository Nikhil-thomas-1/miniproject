const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {  // Added name field
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  attemptedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Alert', AlertSchema);