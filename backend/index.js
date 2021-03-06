const { PORT, DB_LINK } = require("./config");

const mongoose = require("mongoose");
mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(`Connection Succesful` /* , res */))
  .catch((err) => console.log(`Error in DB connection`, err));

const Message = require("./models/Message");

const saveMessages = async () => {
  const privateMessage = {
    route: "private",
    message: "private",
  };

  const publicMessage = {
    route: "public",
    message: "public",
  };

  try {
    await new Message(privateMessage).save();
    await new Message(publicMessage).save();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv.includes("--messages")) {
  saveMessages();
}

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.use(function errorHandler(err, req, res, next) {
  res.status(500).json({ message: "Server error" });
  console.log("Server error: ", err);
});

require("./subs/onCofirmationInsert")();
require("./subs/onResetInsert")();

app.listen(PORT, () => {
  console.log(`Application is listening at port ${PORT}`);
});
