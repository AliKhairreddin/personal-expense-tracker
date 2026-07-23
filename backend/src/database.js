const mysql = require("mysql2/promise");
require("dotenv").config({ quiet: true });

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "expense_tracker",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then((connection) => {
    console.log("Database connected successfully.");
    connection.release();
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

module.exports = pool;
