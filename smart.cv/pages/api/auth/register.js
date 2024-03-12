import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/user";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { sendVerificationEmail } from "../../../utils/nodemailer";

// Nawiązanie połączenia z bazą danych przed obsługą żądań
dbConnect();

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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Wygenerowanie i wysłanie e-maila weryfikacyjnego
    const verificationLink = `https://smart-cv-vercel.vercel.app/verify-email?token=UNIQUE_TOKEN`;
    sendVerificationEmail(email, verificationLink);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default registerHandler;
