const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resetSchema = Schema({
  code: {
    type: String,
    required: true,
  },
  auth_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Reset = mongoose.model("Reset", resetSchema);

module.exports = Reset;
