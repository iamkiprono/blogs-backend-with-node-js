const connection = require("../db/db");
const Match = require('../models/MatchesModel')

// get all matches
const getMatches = async (req, res) => {
  try {
    const results = await Match.find();
    res.send(results);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// add live match
const insertMatch = async (req, res) => {
  const { hometeam, awayteam, homelogo, awaylogo, matchlink } = req.body;

  try {
    if (!hometeam || !awayteam || !homelogo || !awaylogo || !matchlink) {
      throw Error("Fields cannot be blank");
    }
    const result = await Match.create({hometeam, awayteam, homelogo, awaylogo, matchlink})
    res.send({ message: "Match Added", result });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// delete Match
const deleteMatch = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Match.findOneAndDelete({_id:id})
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
