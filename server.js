const express = require("express");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyparser());
app.use(cors());

const connection = mysql.createConnection({
  url:'mysql://root:Fu780CXbTNRFWxogjWYy@containers-us-west-178.railway.app:6537/railway',
  host: "containers-us-west-178.railway.app",
  user: "root",
  password: "Fu780CXbTNRFWxogjWYy",
  database: "railway",
  port:"6537"
});
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql Connected");
});

// routes
// get blogs
app.get("/blogs", (req, res) => {
  connection.query("SELECT * FROM blogg", (err, results) => {
    if (err) {
      res.send(err);
    }
    res.json(results);
  });
});

// get a single blog
app.get("/blogs/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM blogg where id = ${id}`,
    (err, results) => {
      if (err) {
        res.send(err);
      }
      if (results.length === 0) {
        return res.status(200).json({ message: "There is no such blog" });
      }
      res.json(results);
    }
  );
});

// create blog
app.post("/create", (req, res) => {
  const { title, blog, image } = req.body;
  const values = [[title, blog, image]];
  const sql = 'INSERT INTO blogg ( title, blog, image) VALUES ?'
  if (!title || !blog || !image) {
    return res.status(400).json({ message: "Fields cannot be empty" });
  }
  connection.query(sql,[values],
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }

      res.json({ message: "Blog added", title, blog, result });
    }
  );
});

// delete a blog
app.delete("/blogs/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `DELETE  FROM blogg WHERE id=${id}`,
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({ message: `deleted ${id}`, result });
    }
  );
});

app.listen(5000, () => {
  console.log("Running on 5000");
});
