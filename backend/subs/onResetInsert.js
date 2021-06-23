const Reset = require("../models/Reset");
const Authentity = require("../models/AuthEntity");
const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_PW, FRONTEND_HOST } = require("../config");

module.exports = () => {
  Reset.watch().on("change", async (change) => {
    if (change.operationType === "insert") {
      const reset = change.fullDocument;
      const auth = await Authentity.findOne({ _id: reset.auth_id });
      sendMail(reset.code, auth.username, auth.email).catch(console.error);
    }
  });
};

async function sendMail(code, username, email) {
  const link = `${FRONTEND_HOST}/reset?code=${code}&user=${username}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.live.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL,
      pass: EMAIL_PW,
    },
  });

  const info = await transporter.sendMail({
    from: `"Fred Foo 👻" <${EMAIL}>`,
    to: [EMAIL, email].join(", "), // list of receivers
    subject: "Password reset", // Subject line
    text: link, // plain text body
    html: `<a href="${link}">Reset password</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
