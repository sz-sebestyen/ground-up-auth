const AuthEntity = require("../../models/AuthEntity");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

const isUsername = require("../../services/isUsername");
const isEmail = require("../../services/isEmail");

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

  try {
    bcrypt.compare(password, auth.password, async (err, isMatchingPassword) => {
      if (err) return res.status(500).json({ error: err });

      if (isMatchingPassword) {
        const user = await User.findOne(auth);

        if (user) {
          // TODO: login user
        } else {
          // TODO: save user
        }

        console.log("user", user);
        res.json({ message: "Logged in!" });
      } else {
        unauthorize();
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
