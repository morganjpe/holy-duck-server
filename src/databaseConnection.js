const { Client } = require("pg");

const createDatabaseConnection = () =>
  new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
  });

module.exports = {
  createDatabaseConnection,
};
