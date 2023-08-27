const Visits = require("../models/VisitsModel");

const newVisit = async (req, res) => {
  const { hometeam } = req.body;
  const { awayteam } = req.body;

  try {
    const newVisit = await Visits.create({ hometeam, awayteam });
    res.json(newVisit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { newVisit };
