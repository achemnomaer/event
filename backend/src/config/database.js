import mongoose from 'mongoose';
import { config } from './index.js';

export const connectDB = async () => {
  try {
    const uri = config.nodeEnv === 'test' ? config.mongodbTestUri : config.mongodbUri;
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (config.nodeEnv === 'development') {
      mongoose.set('debug', true);
    }

  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
};