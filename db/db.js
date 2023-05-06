const mysql = require("mysql2");

// railway sql connection
const connection = mysql.createPool({

  host: "containers-us-west-178.railway.app",
  user: "root",
  password: "Fu780CXbTNRFWxogjWYy",
  database: "railway",
  port: "6537",
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
