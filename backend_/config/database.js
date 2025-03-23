const mysql = require('mysql2/promise');
const config = require('./config');

const pool = mysql.createPool(config.databaseURI);

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  if (pool) {
    await pool.end();
    console.log('Database pool closed');
  }
  process.exit(0);
});

module.exports = { pool, connectDB };
