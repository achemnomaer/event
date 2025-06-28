import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../../../config/index.js';

export const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    config.jwtAccessSecret,
    { expiresIn: config.jwtAccessExpiresIn }
  );

  const refreshToken = jwt.sign(
    { userId, type: 'refresh', tokenId: crypto.randomUUID() },
    config.jwtRefreshSecret,
    { expiresIn: config.jwtRefreshExpiresIn }
  );

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwtAccessSecret);
  } catch (error) {
    throw new Error('Invalid access token');
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

export const getTokenExpirationTime = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    return null;
  }
};