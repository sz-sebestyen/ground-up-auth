const isUniqueUsername = require("../../services/isUniqueUsername");
const isUniqueEmail = require("../../services/isUniqueEmail");

module.exports = async function (req, res, next) {
  if (req.query.username && (await isUniqueUsername(req.query.username))) {
    res.json({ isUnique: true, message: "Username is unoccupied!" });
  } else if (req.query.email && (await isUniqueEmail(req.query.email))) {
    res.json({ isUnique: true, message: "Email is unoccupied!" });
  } else {
    res.json({ isUnique: false, message: "Occupied!" });
  }
};
