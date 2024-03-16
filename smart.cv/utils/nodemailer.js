const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (email, link) => {
  const mailOptions = {
    from: `"Smart CV" <${process.env.EMAIL_ADDRESS}>`,
    to: email,
    subject: "Verify your email address",
    html: `<p>Please click on the link to verify your email: <a href="${link}">${link}</a></p>`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
