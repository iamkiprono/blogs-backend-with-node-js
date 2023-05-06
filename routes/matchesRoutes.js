const express = require("express");

const {
  insertMatch,
  deleteMatch,
  getMatches,
} = require("../controllers/matchesController");
// const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
 



// get Matches

router.get("/live", getMatches);


// insert Matches
router.post("/live", insertMatch);

// delete Match

router.delete("/live/:id", deleteMatch);


module.exports = router
