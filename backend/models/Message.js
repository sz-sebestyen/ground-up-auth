const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = Schema({
  route: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = Message = mongoose.model("Message", messageSchema);
