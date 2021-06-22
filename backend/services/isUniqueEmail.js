const AuthEntity = require("../models/AuthEntity");

module.exports = async (email) => {
  try {
    const entity = await AuthEntity.findOne({ email });
    return !entity;
  } catch (error) {
    console.log(error);
  }
};
