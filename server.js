require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const matchesRoutes = require("./routes/matchesRoutes");
const connectDb = require('./config/db')
var port = process.env.PORT || 3000;


connectDb()
const app = express();
app.use(express.json());
app.use(cors());


// routes
app.use("/user", userRoutes);

app.use("/", blogRoutes);
app.use("/", matchesRoutes);


app.listen(port,  () => {
  console.log(`Running on PORT ${port}`);
});
