const AuthEntity = require("../models/AuthEntity");

module.exports = async (email) => {
  const entity = await AuthEntity.findOne({ email });
  return !entity;
};
