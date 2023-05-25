const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  hometeam: {
    type: String,
    required: true,
  },
  awayteam: {
    type: String,
    required: true,
  },
  homelogo: {
    type: String,
    required: true,
  },
  awaylogo: {
    type: String,
    required: true,
  },
  matchlink: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("match", matchSchema);
