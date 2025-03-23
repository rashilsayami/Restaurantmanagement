require('dotenv').config();

const config = {
  port: process.env.PORT || 3000, // Add PORT if not added
  databaseURI: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || "9861048480",
    database: process.env.DB_NAME || 'beer_nuts_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  },
  nodeEnv: process.env.NODE_ENV || 'development' // Moved here
};

module.exports = config;
