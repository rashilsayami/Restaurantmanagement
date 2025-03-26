require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // For storing sessions in DB
const globalErrorHandler = require('./middlewares/globalErrorHandler');

const { sequelize, connectDB } = require('./config/database');
const config = require('./config/config');
const PORT = config.port;

const app = express(); // Initialize express app

// Database connection
connectDB();

sequelize.sync()
  .then(() => console.log('All models were synchronized successfully.'))
  .catch(err => console.error('Error syncing models:', err));

// Middleware
app.use(express.json());

// ------------------- SESSION CONFIG -------------------
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use .env secret key in production!
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: false // Set to true in production with HTTPS
  }
}));
// ------------------------------------------------------

// Default test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running on MySQL!' });
});

// Import routes
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/inventory', require('./routes/inventoryRoute'));

// Global error handler
app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
