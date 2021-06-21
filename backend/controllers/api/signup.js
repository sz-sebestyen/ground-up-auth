const Message = require("../../models/Message");

module.exports = async function getPublicMessage(req, res, next) {
  try {
    console.log("signup data: ", req.body);
    res.json({ message: "dto received" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
