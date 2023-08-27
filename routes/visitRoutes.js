const express = require("express");
const { newVisit, allVisits } = require("../controllers/visitContoller");

const router = express.Router();

router.post("/", newVisit);
router.get("/", allVisits);

module.exports = router;
