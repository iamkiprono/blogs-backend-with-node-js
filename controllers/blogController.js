const connection = require("../db/db");
const Blog = require("../models/blogModel");

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
    res.status(400).send({ error: error.message });
  }
};

// get single blog
const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await connection.query("SELECT * FROM blogg where id = ?", [
      id,
    ]);
    res.send(results[0]);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  // try {
  //   const results = await connection.query(
  //     "SELECT * FROM blogg ORDER BY id DESC"
  //   );
  //   res.json(results[0]);
  // } catch (error) {
  //   res.status(400).send({ error: error.message });
  // }
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
    res.status(400).send({ error: error.message });
  }
};

module.exports = { createBlog, getBlog, getBlogs, deleteBlog };
