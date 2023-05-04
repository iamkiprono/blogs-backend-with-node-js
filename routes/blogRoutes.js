const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
} = require("../controllers/blogController");

// get blogs
router.get("/blogs", getBlogs);

// get single blog
router.get("/blogs/:id", getBlog);

// create blog
router.post("/create", createBlog);

// delete blog
router.delete("/blogs/:id", deleteBlog);

module.exports = router;
