const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, //email address from the .env file
    pass: process.env.EMAIL_PASS, //email password from the .env file
  },
});

// Route to handle email sending
router.post('/send-email', async (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for subscribing to Fuzzies!',
    text: `Hello,

Thank you for subscribing to Fuzzies! We're excited to keep you updated on the latest news, products, and offers.

Best regards,
The Fuzzies Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

module.exports = router;
