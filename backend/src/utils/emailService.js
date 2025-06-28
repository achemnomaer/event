import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';
import { config } from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class EmailService {
  static transporter = null;

  static async getTransporter() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransporter({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.secure,
        auth: {
          user: config.smtp.user,
          pass: config.smtp.pass
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // Verify connection
      try {
        await this.transporter.verify();
        console.log('✅ SMTP connection verified');
      } catch (error) {
        console.error('❌ SMTP connection failed:', error);
        throw error;
      }
    }

    return this.transporter;
  }

  static async loadTemplate(templateName) {
    try {
      const templatePath = path.join(__dirname, '../templates', `${templateName}.hbs`);
      const templateContent = await fs.readFile(templatePath, 'utf-8');
      return handlebars.compile(templateContent);
    } catch (error) {
      console.error(`Failed to load email template ${templateName}:`, error);
      throw error;
    }
  }

  static async sendEmail({ to, subject, html, text }) {
    try {
      const transporter = await this.getTransporter();

      const mailOptions = {
        from: `${config.emailFromName} <${config.emailFrom}>`,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, '') // Strip HTML for text version
      };

      const result = await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully to ${to}`);
      return result;
    } catch (error) {
      console.error(`❌ Failed to send email to ${to}:`, error);
      throw error;
    }
  }

  static async sendVerificationEmail(email, firstName, otp) {
    try {
      const template = await this.loadTemplate('verification');
      const html = template({
        firstName,
        otp,
        frontendUrl: config.frontendUrl,
        year: new Date().getFullYear()
      });

      await this.sendEmail({
        to: email,
        subject: 'Verify Your Email - ANTGEC',
        html
      });
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw error;
    }
  }

  static async sendPasswordResetEmail(email, firstName, otp) {
    try {
      const template = await this.loadTemplate('password-reset');
      const html = template({
        firstName,
        otp,
        frontendUrl: config.frontendUrl,
        year: new Date().getFullYear()
      });

      await this.sendEmail({
        to: email,
        subject: 'Reset Your Password - ANTGEC',
        html
      });
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw error;
    }
  }

  static async sendWelcomeEmail(email, firstName) {
    try {
      const template = await this.loadTemplate('welcome');
      const html = template({
        firstName,
        frontendUrl: config.frontendUrl,
        year: new Date().getFullYear()
      });

      await this.sendEmail({
        to: email,
        subject: 'Welcome to ANTGEC!',
        html
      });
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }
  }
}