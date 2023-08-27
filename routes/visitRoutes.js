const express = require("express");
const { newVisit } = require("../controllers/visitContoller");

const router = express.Router();

router.post("/", newVisit);

module.exports = router;
