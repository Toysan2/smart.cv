const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "in-v3.mailjet.com", // Mailjet SMTP server
  port: 465, // Secure SMTP port
  secure: true, // Use TLS
  auth: {
    user: process.env.MAILJET_API_KEY, // Your Mailjet API Key
    pass: process.env.MAILJET_API_SECRET, // Your Mailjet API Secret
  },
});

export const sendVerificationEmail = async (email, link) => {
  // Email options
  const mailOptions = {
    from: '"Smart CV" <smart.cv@mail.ee>', // sender address
    to: email, // list of receivers
    subject: "Verify your email address", // Subject line
    html: `<p>Please click on the link to verify your email: <a href="${link}">${link}</a></p>`, // html body
  };

  // Send email
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", result);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
