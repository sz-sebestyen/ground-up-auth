const isUniqueEmail = require("../../services/isUniqueEmail");

module.exports = async function getPrivateMessage(req, res, next) {
  if (await isUniqueEmail(req.body.email)) {
    res.json({ isUnique: true, message: "Email is unoccupied!" });
  } else {
    res.json({ isUnique: false, message: "Email is occupied!" });
  }
};
