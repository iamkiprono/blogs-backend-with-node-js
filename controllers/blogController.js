const connection = require("../db/db");

// create blog
const createBlog = async (req, res) => {
  const { title, blog, image } = req.body;

  try {
    if (!title || !blog || !image) {
      throw Error("Fields cannot be empty");
    }
    const values = [[title, blog, image]];
    const sql = "INSERT INTO blogg ( title, blog, image) VALUES ?";
    const result = await connection.query(sql, [values]);
    res.send({ message: "Blog added", result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

// get single blog
const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await connection.query("SELECT * FROM blogg where id = ?",[id])
    res.send(results[0])
  } catch (error) {
    res.send({error: error.message})
  }
};

// get all blogs
const getBlogs = async (req, res) => {
  try {
    const results = await connection.query(
      "SELECT * FROM blogg ORDER BY id DESC"
    );
    res.json(results[0]);
  } catch (error) {
    res.send({ error: error.message });
  }
};

// delete blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await connection.query("DELETE FROM blogg WHERE id = ?", [
      id,
    ]);
    res.send({ message: `${id} deleted`, result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = { createBlog, getBlog, getBlogs, deleteBlog };
