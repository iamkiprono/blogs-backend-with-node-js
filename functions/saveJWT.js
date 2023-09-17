const res = require("express/lib/response");
const Jwt = require("../models/jwtModel");

const saveJwt = async (token) => {
  try {
    const savedToken = await Jwt.create({ jwt: token });
    return savedToken
  } catch (error) {
    throw Error(error.message) 
  }
};

module.exports = saveJwt;
