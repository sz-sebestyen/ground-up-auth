const Message = require("../models/Message");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config");

module.exports = async function getPrivateMessage(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json("Unauthorized!");

    console.log("user id: ", decoded.id);

    const message = await Message.findOne(
      { route: "private" },
      { _id: 0 }
    ).select("message");

    if (!message) {
      res.status(404).json("No message found!");
    } else {
      res.json(message);
    }
  });
};
