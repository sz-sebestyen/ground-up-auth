const Message = require("../models/Message");

module.exports = async function getPrivateMessage(req, res, next) {
  const message = await Message.findOne(
    { route: "private" },
    { _id: 0 }
  ).select("message");

  if (!message) {
    res.status(404).json("No message found!");
  } else {
    res.json(message);
  }
};
