const AuthEntity = require("../models/AuthEntity");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config");

const isUsername = require("../services/isUsername");
const isEmail = require("../services/isEmail");

module.exports = async function loginUser(req, res, next) {
  const unauthorize = () =>
    res.status(401).json({ message: "Wrong username or password!" });

  const { usernameOrEmail, password } = req.body;

  let auth;
  if (isUsername(usernameOrEmail)) {
    auth = await AuthEntity.findOne({ username: usernameOrEmail });
  } else if (isEmail(usernameOrEmail)) {
    auth = await AuthEntity.findOne({ email: usernameOrEmail });
  } else {
    return unauthorize();
  }

  if (!auth.isConfirmed)
    return res.status(401).json({ message: "User is not confirmed!" });

  bcrypt.compare(password, auth.password, async (err, isMatchingPassword) => {
    if (err) return res.status(500).json({ error: err });

    if (isMatchingPassword) {
      const { username, email } = auth;
      let user = await User.findOne({ username });

      if (!user) {
        user = await User.create({ username, email });

        user.authentity = auth;
        await user.save();
        res.status(201);
      }

      res.json({ username, email, jwt: createJwt({ id: user._id }) });
    } else {
      unauthorize();
    }
  });
};

const createJwt = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
