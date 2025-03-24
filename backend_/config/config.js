require('dotenv').config();

const config = Object.freeze({
    port: process.env.PORT || 3000,
    database: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME || "beer_nuts_db",
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DB_DIALECT || "mysql"
    },
    nodeEnv: process.env.NODE_ENV || "development",
    sessionSecret: process.env.SESSION_SECRET
});

module.exports = config;

