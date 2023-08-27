require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const matchesRoutes = require("./routes/matchesRoutes");
const visitRoutes = require("./routes/visitRoutes");
const connectDb = require("./config/db");
const port = process.env.PORT;

connectDb();
const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/user", userRoutes);

app.use("/", blogRoutes);
app.use("/", matchesRoutes);
app.use("/visits", visitRoutes);

app.listen(port, () => {
  console.log(`Running on PORT ${port}`);
});
