const express = require("express");

const {
  insertMatch,
  deleteMatch,
  getMatches,
} = require("../controllers/matchesController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// get Matches

router.get("/live", getMatches);

// insert Matches
router.post("/live", requireAuth, insertMatch);

// delete Match

router.delete("/live/:id", requireAuth, deleteMatch);

module.exports = router;
