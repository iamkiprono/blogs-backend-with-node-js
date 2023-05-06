const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const matchesRoutes = require("./routes/matchesRoutes");
var port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/user", userRoutes);
app.use("/", blogRoutes);
app.use("/", matchesRoutes);


app.listen(port, '0.0.0.0', () => {
  console.log(`Running on PORT ${port}`);
});
