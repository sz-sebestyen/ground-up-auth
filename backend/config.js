require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB_LINK: process.env.DB_LINK,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN),
};
