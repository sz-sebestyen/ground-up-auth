const AuthEntity = require("../models/AuthEntity");
const Confirmation = require("../models/Confirmation");
const isUniqueEmail = require("../services/isUniqueEmail");
const isUniqueUsername = require("../services/isUniqueUsername");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config");

module.exports = async function registerUser(req, res, next) {
  const validationError = getValidationError(req.body);

  if (validationError) res.json({ error: validationError });

  const { username, email, password } = req.body;

  if (!isUniqueEmail(email)) {
    res.status(409).json({ error: { message: "Occupied email!" } });
  }

  if (!isUniqueUsername(username)) {
    res.status(409).json({ error: { message: "Occupied username!" } });
  }

  bcrypt.hash(password, SALT_ROUNDS, async (error, hash) => {
    if (error) throw error;

    const authEntity = {
      username,
      email,
      password: hash,
    };

    const auth = await new AuthEntity(authEntity).save();

    const { randomBytes } = await import("crypto");

    randomBytes(256, async (err, buf) => {
      if (err) throw err;

      const code = buf.toString("hex");

      const confirmation = {
        auth_id: auth._id,
        code,
      };

      await new Confirmation(confirmation).save();

      res.status(201).json({ username, email });
    });
  });
};

const isUsername = require("../services/isUsername");
const isEmail = require("../services/isEmail");
const isPassword = require("../services/isPassword");

const getValidationError = (dto) => {
  if (!isUsername(dto.username)) {
    return { type: "username", message: "Invalid username!" };
  }

  if (!isEmail(dto.email)) {
    return { type: "email", message: "Invalid email!" };
  }

  if (!isPassword(dto.password) || dto.password !== dto.password2) {
    return { type: "password", message: "Invalid password!" };
  }
};
