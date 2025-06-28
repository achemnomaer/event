import crypto from 'crypto';
import { config } from '../../../config/index.js';

export const generateOTP = (length = config.otp.length) => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[crypto.randomInt(0, digits.length)];
  }
  
  return otp;
};

export const generateOTPExpiry = () => {
  return new Date(Date.now() + config.otp.expiresIn);
};

export const isOTPExpired = (expiryDate) => {
  return new Date() > expiryDate;
};

export const canResendOTP = (lastSentAt) => {
  if (!lastSentAt) return true;
  return Date.now() - lastSentAt.getTime() > config.otp.resendCooldown;
};