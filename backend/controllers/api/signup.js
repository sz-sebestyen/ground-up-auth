const AuthEntity = require("../../models/AuthEntity");

module.exports = async function registerUser(req, res, next) {
  try {
    console.log("signup data: ", req.body);
    const validationError = getValidationError(req.body);

    if (validationError) res.json({ error: validationError });

    res.json({ message: "dto received" });
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
