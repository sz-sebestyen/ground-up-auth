const AuthEntity = require("../models/AuthEntity");
const Reset = require("../models/Reset");
const isUsername = require("../services/isUsername");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config");

module.exports = async function changePassword(req, res, next) {
  const unauthorize = () => res.status(401).json({ message: "Unauthorized!" });

  const { username, code, password, passwrod2 } = req.body;

  if (!isUsername(username)) {
    return unauthorize();
  }

  if (password !== passwrod2) {
    return unauthorize();
  }

  const auth = await AuthEntity.findOne({ username });

  if (!auth) return unauthorize();

  const reset = await Reset.findOne({ auth_id: auth._id });

  const minutesPassed =
    (Date.now() - new Date(reset.date).getTime()) / 1000 / 60;

  if (minutesPassed > 5) {
    return unauthorize();
  }

  const { timingSafeEqual } = await import("crypto");

  if (timingSafeEqual(code, reset.code)) {
    bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
      if (err) throw "Hashing error";

      auth.password = hash;

      await auth.save();
      res.status(201).json({ status: "success", message: "Password changed!" });
    });
  } else {
    return unauthorize();
  }
};
