const isUniqueUsername = require("../../services/isUniqueUsername");

module.exports = async function getPrivateMessage(req, res, next) {
  if (isUniqueUsername(req.body.username)) {
    res.json({ isUnique: true, message: "Username is unoccupied!" });
  }

  res.json({ isUnique: false, message: "Username is occupied!" });
};
