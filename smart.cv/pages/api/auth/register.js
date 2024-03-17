import dbConnect from "@/utils/dbConnect";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { sendVerificationEmail } from "@/utils/nodemailer";
import crypto from "crypto";

const registerHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email, password } = value;
  try {
    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verified: false,
    });

    await user.save();

    const verificationLink = `https://smart-cv-vercel.vercel.app/verify-email?token=${verificationToken}`;
    // Wywołanie sendVerificationEmail jako operacji nieblokującej
    sendVerificationEmail(email, verificationLink).catch(console.error);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default registerHandler;
