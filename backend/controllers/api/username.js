const isUniqueUsername = require("../../services/isUniqueUsername");

module.exports = async function getPrivateMessage(req, res, next) {
  if (await isUniqueUsername(req.body.username)) {
    res.json({ isUnique: true, message: "Username is unoccupied!" });
  } else {
    res.json({ isUnique: false, message: "Username is occupied!" });
  }
};
