const Confirmation = require("../models/Confirmation");
const Authentity = require("../models/AuthEntity");
const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_PW, FRONTEND_HOST } = require("../config");

module.exports = () => {
  Confirmation.watch().on("change", async (change) => {
    if (change.operationType === "insert") {
      const confirmation = change.fullDocument;
      const auth = await Authentity.findOne({ _id: confirmation.auth_id });
      sendMail(confirmation.code, auth.username, auth.email).catch(
        console.error
      );
    }
  });
};

/* 
{
  _id: {
    _data: '8260D1FE72000000052B022C0100296E5A100449397C67BF2D4EF591A872E64C70C71346645F6964006460D1FE72905561799ADCC44D0004'
  },
  operationType: 'insert',
  clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 5, high_: 1624374898 },
  fullDocument: {
    _id: 60d1fe72905561799adcc44d,
    date: 2021-06-22T15:14:58.283Z,
    auth_id: '60d1fe72905561799adcc44b',
    code: '910553f80eb3176fd8be062a7844bc48712b81c7aa9d3ceab42a817bf612b08dfd2d7c420eba168ff8cf3bda9125e1f29761e4e3583cd2498d7085b125930063defab69e3d5c80377f1b4fbe814d74f2cb7412ab7f62e39fca8c0fa4ccea049eacbf8267ea35f8157d0e68b7968b9d749b081bb11ca1db55e17d9ca9b997b4266c3c3cf9e8140f84b4304f8e6757715454121afe219d762a76d7c7a686b859b3b2eacf78c8a3575ca189bfec470feaabb09d7d8449564aad7e22dcbb6d26fc658153aa72eb24116da8deeab1798f301eb9194dc5e814c469a361d05af5be6e1544c26b88c7aafe5102ed18e88760f9fd2510d45b75ebcfb8e42baf5aec1d9792',
    __v: 0
  },
  ns: { db: 'dbForNoGoogleAuth', coll: 'confirmations' },
  documentKey: { _id: 60d1fe72905561799adcc44d }
} */

async function sendMail(code, username, email) {
  const link = `${FRONTEND_HOST}/confirm?code=${code}&user=${username}`;

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
    subject: "Eamil confirmation", // Subject line
    text: link, // plain text body
    html: `<a href="${link}">Confirm email</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
