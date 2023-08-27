const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const visitSchema = new Schema(
  {
    hometeam: {
      type: String,
      required: true,
    },
    awayteam: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visit", visitSchema);
