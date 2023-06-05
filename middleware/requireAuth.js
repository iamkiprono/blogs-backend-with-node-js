const jwt = require("jsonwebtoken");
const connection = require("../db/db");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw Error("Token required");
    }
    const token = req.headers.authorization.split(" ")[1];
    const  _id  = jwt.verify(token, "CH3M051TK1TY0K37010614").id;

    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = requireAuth;
