const AuthEntity = require("../../models/AuthEntity");

module.exports = async function registerUser(req, res, next) {
  try {
    console.log("signup data: ", req.body);
    res.json({ message: "dto received" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const isValidDto = (dto) => {};
