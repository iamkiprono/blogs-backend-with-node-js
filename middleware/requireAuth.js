const jwt = require("jsonwebtoken");
const connection = require("../db/db");

const requireAuth = async (req, res, next) => {
  // verify authentication

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token,process.env.SECRET);
    console.log(id)

    const authUser = await connection.query("SELECT id FROM users where ID = ?", [
        id,
      ]);

    req.user = authUser[0][0]
    console.log(req.user)
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
