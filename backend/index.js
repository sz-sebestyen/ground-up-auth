require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(`Connection Succesful` /* , res */))
  .catch((err) => console.log(`Error in DB connection`, err));

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`Application is listening at port ${process.env.PORT}`);
});
