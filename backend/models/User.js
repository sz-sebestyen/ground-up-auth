const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  authentity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuthEntity",
  },
});

module.exports = User = mongoose.model("User", userSchema);
