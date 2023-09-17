const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jwtSchema = new Schema(
  {
    jwt: {
      type: String,
      required: true,
    }
  
    
  },
  { timestamps: true }
);


module.exports = mongoose.model('Jwt', jwtSchema)