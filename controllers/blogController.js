const connection = require("../db/db");
const Blog = require("../models/BlogModel");

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
    const results = await Blog.findOne({ _id: id });

    res.send(results);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// get all blogs
const getBlogs = async (req, res) => {
  try {
    const results = await Blog.find().sort({ createdAt: -1 || datecreated: -1});
    res.json(results);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
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
