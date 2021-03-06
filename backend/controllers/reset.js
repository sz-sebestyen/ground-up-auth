const AuthEntity = require("../models/AuthEntity");
const Reset = require("../models/Reset");
const isEmail = require("../services/isEmail");

module.exports = async function createResetRequest(req, res, next) {
  const rejectRequest = () => res.status(400).json({ message: "Bad request!" });

  const { email } = req.body;

  if (!isEmail(email)) {
    return rejectRequest();
  }

  const auth = await AuthEntity.findOne({ email });

  if (!auth) return rejectRequest();

  const { randomBytes } = await import("crypto");

  randomBytes(256, async (err, buf) => {
    if (err) throw err;

    const code = buf.toString("hex");

    const reset = {
      auth_id: auth._id,
      code,
    };

    await new Reset(reset).save();

    res.status(201).json({ email });
  });
};
