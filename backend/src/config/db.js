require("dotenv").config();

module.exports = {
  database: process.env.DB_NAME || "database",
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
};
