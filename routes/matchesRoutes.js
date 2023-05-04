const express = require("express");
const router = express.Router();

const {
  insertMatch,
  deleteMatch,
  getMatches,
} = require("../controllers/matchesController");

// get Matches

router.get("/live", getMatches);

// insert Matches
router.post("/live", insertMatch);

// delete Match

router.delete("/live/:id", deleteMatch);


module.exports = router
