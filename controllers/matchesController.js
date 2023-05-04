const connection = require("../db/db");

// get all matches
const getMatches = async (req, res) => {
  try {
    const results = await connection.query("SELECT * FROM live");
    res.send(results[0]);
  } catch (error) {
    res.send({ error: error.message });
  }
};

// add live match
const insertMatch = async (req, res) => {
  const { hometeam, awayteam, homelogo, awaylogo, matchlink } = req.body;

  try {
    if (!hometeam || !awayteam || !homelogo || !awaylogo || !matchlink) {
      throw Error("Fields cannot be blank");
    }
    const result = await connection.query(
      "INSERT INTO live (hometeam, awayteam, homelogo, awaylogo, matchlink) VALUES (?, ?, ?, ?, ?)",
      [hometeam, awayteam, homelogo, awaylogo, matchlink]
    );
    res.send({ message: "Match Added", result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

// delete Match
const deleteMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await connection.query("DELETE FROM live WHERE id = ?", [
      id,
    ]);
    res.send({ message: `Deleted ${id}`, result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = {
  insertMatch,
  getMatches,
  deleteMatch,
};
