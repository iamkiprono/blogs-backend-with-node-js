require("dotenv").config();
const connection = require("../db/db");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("All fields are required");
    }
    const user = await connection.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);

    if (!user[0].length) {
      throw Error("Incorrect email");
    }
    const match = await bcrypt.compare(password, user[0][0].password);
    if (!match) {
      throw Error("Incorrect password");
    }
    const token = createToken(user[0].id);
    res.status(200).send({ email, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// sign up user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

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

    const exists = await connection.query(
      `SELECT email FROM users WHERE email = ?`,
      [email]
    );
    if (exists[0].length) {
      throw Error("Email already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await connection.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hash]
    );
    const token = createToken(user[0].insertId);
    res.status(200).send({ email, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
