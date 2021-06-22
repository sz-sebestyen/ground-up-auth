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
    required: true,
  },
});

const Confirmation = mongoose.model("Confirmation", confirmationSchema);

const changeStream = Confirmation.watch().on("change", (change) =>
  console.log(change)
);
console.log(changeStream);

module.exports = Confirmation;
