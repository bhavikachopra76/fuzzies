require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

const port = process.env.PORT || 2323;

// ------------------- CORS Setup -------------------
// Allow localhost and all Vercel deployments
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server requests
    if (origin.includes('.vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error(`CORS not allowed from origin ${origin}`));
    }
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

// ------------------- Middleware -------------------
app.use(bodyParser.json());

// ------------------- Routes -------------------
const categoryRoutes = require('./routes/category.cjs');
const productsRoutes = require('./routes/products.cjs');
const authRoutes = require('./routes/auth.cjs');
const emailRoutes = require('./routes/email.cjs');
const cartRouter = require('./routes/Cart.cjs');
const paymentRoutes = require('./routes/payment.cjs');
const billingRoutes = require('./routes/billing.cjs'); 
const feedbackRoutes = require('./routes/feedback.cjs');

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRouter);
app.use('/api/products', feedbackRoutes);
app.use('/api', billingRoutes);
app.use('/api/mail', emailRoutes);
app.use('/api/payment', paymentRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ------------------- Database -------------------
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.log('Failed to connect to MongoDB Atlas', error));

mongoose.connection.on('connected', () => {
  console.log(`Connected to DB: ${mongoose.connection.name}`);
});

// ------------------- Server -------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
