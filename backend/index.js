const { PORT, DB_LINK } = require("./config");

const mongoose = require("mongoose");
mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(`Connection Succesful` /* , res */))
  .catch((err) => console.log(`Error in DB connection`, err));

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Application is listening at port ${PORT}`);
});
