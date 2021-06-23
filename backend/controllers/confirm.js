const AuthEntity = require("../models/AuthEntity");
const Confirmation = require("../models/Confirmation");
const isUsername = require("../services/isUsername");

module.exports = async function confirmEmail(req, res, next) {
  const unauthorize = () => res.status(401).json({ message: "Unauthorized!" });

  const { username, code } = req.body;

  if (!isUsername(username)) {
    return unauthorize();
  }

  try {
    const auth = await AuthEntity.findOne({ username });

    if (!auth) return unauthorize();

    const confirmation = await Confirmation.findOne({ auth_id: auth._id });

    const minutesPassed =
      (Date.now() - new Date(confirmation.date).getTime()) / 1000 / 60;

    if (minutesPassed > 5) {
      return unauthorize();
    }

    if (code === confirmation.code) {
      auth.isConfirmed = true;
      await auth.save();
      res.status(201).json({ status: "success", message: "Email confirmed!" });
    } else {
      unauthorize();
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
