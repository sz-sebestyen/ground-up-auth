const AuthEntity = require("../../models/AuthEntity");
const bcrypt = require("bcrypt");

const isUsername = require("../../services/isUsername");
const isEmail = require("../../services/isEmail");

module.exports = async function loginUser(req, res, next) {
  const unauthorize = () =>
    res.status(401).json({ message: "Wrong username or password!" });

  const { usernameOrEmail, password } = req.body;

  let user;
  if (isUsername(usernameOrEmail)) {
    user = await AuthEntity.findOne({ username: usernameOrEmail });
  } else if (isEmail(usernameOrEmail)) {
    user = await AuthEntity.findOne({ email: usernameOrEmail });
  } else {
    return unauthorize();
  }

  try {
    bcrypt.compare(password, user.password, (err, isMatchingPassword) => {
      if (err) return res.status(500).json({ error: err });

      if (isMatchingPassword) {
        // TODO: login user
        console.log("matching pw");
        res.json({ message: "Logged in!" });
      } else {
        unauthorize();
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
