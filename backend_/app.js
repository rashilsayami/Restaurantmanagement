require('dotenv').config();
const express = require('express');
const app = express(); // Initialize express app
const globalErrorHandler = require('./middlewares/globalErrorHandler');

const { sequelize, connectDB } = require('./config/database');
const config = require('./config/config');
const PORT = config.port;

// Database connection
connectDB();

sequelize.sync()
  .then(() => console.log('All models were synchronized successfully.'))
  .catch(err => console.error('Error syncing models:', err));

// Middleware
app.use(express.json());

// Default test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running on MySQL!' });
});

// Import routes
app.use('/api/user', require('./routes/userRoute'));

// Global error handler if you have one

app.use(globalErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
