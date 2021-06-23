const AuthEntity = require("../models/AuthEntity");

module.exports = async (username) => {
  const entity = await AuthEntity.findOne({ username });
  return !entity;
};
