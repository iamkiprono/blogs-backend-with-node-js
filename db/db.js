const mysql = require("mysql2");

// railway sql connection
const connection = mysql.createPool({

  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
}).promise();

// local connection (workbench)
// const connection = mysql
//   .createPool({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "blogs",
//     port: "3306",
//   })
//   .promise();

module.exports = connection;
