const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const confirmationSchema = Schema({
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

const Confirmation = mongoose.model("Confirmation", confirmationSchema);

module.exports = Confirmation;
