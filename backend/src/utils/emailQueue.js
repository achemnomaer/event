import Queue from 'bull';
import { config } from '../config/index.js';
import { EmailService } from './emailService.js';

// Create email queue
export const emailQueue = new Queue('email processing', {
  redis: {
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password
  }
});

// Process email jobs
emailQueue.process('send-verification-email', async (job) => {
  const { email, firstName, otp } = job.data;
  await EmailService.sendVerificationEmail(email, firstName, otp);
});

emailQueue.process('send-password-reset-email', async (job) => {
  const { email, firstName, otp } = job.data;
  await EmailService.sendPasswordResetEmail(email, firstName, otp);
});

emailQueue.process('send-welcome-email', async (job) => {
  const { email, firstName } = job.data;
  await EmailService.sendWelcomeEmail(email, firstName);
});

// Error handling
emailQueue.on('failed', (job, err) => {
  console.error(`Email job ${job.id} failed:`, err);
});

emailQueue.on('completed', (job) => {
  console.log(`Email job ${job.id} completed successfully`);
});

// Retry configuration
emailQueue.on('stalled', (job) => {
  console.log(`Email job ${job.id} stalled, retrying...`);
});