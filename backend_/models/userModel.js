const mysql = require('mysql2/promise');

async function createUserTable() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9861048480',
    database: 'beer_nuts_db'
  });

  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(10) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  await connection.execute(query);
  console.log('Users table created or already exists');
  await connection.end();
}

createUserTable().catch(console.error);