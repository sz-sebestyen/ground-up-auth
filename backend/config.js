require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB_LINK: process.env.DB_LINK,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN),
  EMAIL: process.env.EMAIL,
  EMAIL_PW: process.env.EMAIL_PW,
  FRONTEND_HOST: process.env.FRONTEND_HOST,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
};
