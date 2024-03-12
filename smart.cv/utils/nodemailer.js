import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "mail.ee",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (to, link) => {
  await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: to,
    subject: "Verify Your Email",
    html: `<p>Click <a href="${link}">here</a> to verify your email.</p>`,
  });
};
