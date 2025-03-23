require('dotenv').config();
const express = require('express');
const app = express();

const config = require('./config/config');
const { connectDB } = require('./config/database');
const globalErrorHandler = require('./middlewares/globalErrorHandler'); // Add this!

const PORT = config.port;

connectDB(); // DB connection

// middlewares
app.use(express.json());  // parse incoming  request in JSON

app.use(express.json()); // Add if needed

// Define route root end point
app.get('/', (req, res) => {     

    res.json({ message: 'this is pos server!' });
});


// other end points
app.use("/api/user",require('./routes/userRoute'));
// Global error handler
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`POS server is running at http://localhost:${PORT}`);
});
