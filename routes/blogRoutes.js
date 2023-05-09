const express = require("express");
const router = express.Router();
const {
  createBlog,
  getBlogs,
  getBlog,
  deleteBlog,
} = require("../controllers/blogController");
const requireAuth = require("../middleware/requireAuth");

// get blogs
router.get("/blogs", getBlogs);


// get single blog
router.get("/blogs/:id", getBlog);

// create blog
router.post("/create",requireAuth, createBlog);

// delete blog
router.delete("/blogs/:id",requireAuth, deleteBlog);

module.exports = router;
