const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authEntitySchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = AuthEntity = mongoose.model("AuthEntity", authEntitySchema);
