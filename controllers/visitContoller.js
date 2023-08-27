const Visits = require("../models/VisitsModel");

// add new visit
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

// get all visits

const allVisits = async (req, res) => {
  try {
    const allVisits = await Visits.find();
    res.send(allVisits);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { newVisit, allVisits };
