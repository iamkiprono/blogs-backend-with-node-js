const connection = require("../db/db");
<<<<<<< HEAD
const Blog = require("../models/blogModel");
=======
const Blog = require("../models/BlogModel");
>>>>>>> 93995f064084631b6bb92e70a2ad9488076a5bad

// create blog
const createBlog = async (req, res) => {
  const { title, blog, image } = req.body;

  try {
    if (!title || !blog || !image) {
      throw Error("Fields cannot be empty");
    }
    const result = await Blog.create({ title, blog, image });
    res.send({ message: "Blog added", result });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// get single blog
const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
<<<<<<< HEAD
    const results = await connection.query("SELECT * FROM blogg where id = ?", [
      id,
    ]);
    res.send(results[0]);
=======
    const results = await Blog.findOne({ _id: id });

    res.send(results);
>>>>>>> 93995f064084631b6bb92e70a2ad9488076a5bad
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// get all blogs
const getBlogs = async (req, res) => {
  try {
<<<<<<< HEAD
    const blogs = await Blog.find();
    res.status(200).json(blogs);
=======
    const results = await Blog.find().sort({ createdAt: -1 });
    res.json(results);
>>>>>>> 93995f064084631b6bb92e70a2ad9488076a5bad
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
    const result = await Blog.findOneAndDelete({ _id: id });
    res.send({ message: `${id} deleted`, result });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { createBlog, getBlog, getBlogs, deleteBlog };
