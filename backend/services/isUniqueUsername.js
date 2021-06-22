const AuthEntity = require("../models/AuthEntity");

module.exports = async (username) => {
  try {
    const entity = await AuthEntity.find({ username });
    return !entity;
  } catch (error) {
    console.log(error);
  }
};
