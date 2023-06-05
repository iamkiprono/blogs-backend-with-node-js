require("dotenv").config();
const connection = require("../db/db");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (id) => {
  return jwt.sign({ id }, "CH3M051TK1TY0K37010614", { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("All fields are required");
    }
    const user = await User.findOne({email})

    if (!user) {
      throw Error("Incorrect email");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }

    // const { admin } = user[0][0];

    // console.log(user[0][0]);
    const id = user._id;
    const admin = user.admin
    const token = createToken(id);
    res.status(200).send({ id, email, token, admin });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// sign up user
const signupUser = async (req, res) => {
  const { email, password, admin } = req.body;

  try {
    if (!email || !password) {
      throw Error("All fields are required");
    }
    if (!validator.isEmail(email)) {
      throw Error("Not valid email");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    // const exists = await connection.query(
    //   `SELECT email FROM users WHERE email = ?`,
    //   [email]
    // );
    // if (exists[0].length) {
    //   throw Error("Email already in use");
    // }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hash, admin });

    const id = user._id;
    console.log(id);
    const token = await createToken(id);
    res.status(200).send({ id, email, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
