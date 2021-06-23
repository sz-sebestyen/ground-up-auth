const Message = require("../models/Message");

module.exports = async function getPublicMessage(req, res, next) {
  const message = await Message.findOne({ route: "public" }, { _id: 0 }).select(
    "message"
  );

  if (!message) {
    res.status(404).json("No message found!");
  } else {
    res.json(message);
  }
};
