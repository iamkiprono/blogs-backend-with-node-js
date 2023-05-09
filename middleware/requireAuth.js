const jwt = require("jsonwebtoken");
const connection = require("../db/db");

const requireAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw Error("Token required");
    }
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, "CH3M051TK1TY0K37010614");
    console.log(id)
    req.user = await connection.query("SELECT * FROM users where id = ? ", [id])
    console.log(req.user[0][0])
 
    next()
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = requireAuth;
