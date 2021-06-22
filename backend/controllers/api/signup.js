const AuthEntity = require("../../models/AuthEntity");
const isUniqueEmail = require("../../services/isUniqueEmail");
const isUniqueUsername = require("../../services/isUniqueUsername");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = async function registerUser(req, res, next) {
  try {
    const validationError = getValidationError(req.body);

    if (validationError) res.json({ error: validationError });

    const { username, email, password } = req.body;

    if (!isUniqueEmail(email)) {
      res.json({ error: { message: "Occupied email!" } });
    }

    if (!isUniqueUsername(username)) {
      res.json({ error: { message: "Occupied username!" } });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) res.status(500).json({ error: err });

      const authEntity = {
        username,
        email,
        password: hash,
      };

      try {
        await new AuthEntity(authEntity).save();

        res.json({ username, email });
      } catch (error) {
        res.status(500).json({ error });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getValidationError = (dto) => {
  if (!dto.username.match(/[a-zA-Z0-9]{4,}/)) {
    return { type: "username", message: "Invalid username!" };
  }

  if (
    !dto.email.match(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    return { type: "email", message: "Invalid email!" };
  }

  if (
    !dto.password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ) ||
    dto.password !== dto.password2
  ) {
    return { type: "password", message: "Invalid password!" };
  }
};
