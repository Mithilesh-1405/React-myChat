const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};
