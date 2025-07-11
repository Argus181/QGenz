const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  resetOTP: String,
  resetOTPExpiry: Date,
  otpAttempts: { type: Number, default: 0 },
  lastOtpAttempt: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
