import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/user";
import bcrypt from "bcryptjs";
import Joi from "joi";

const loginHandler = async (req, res) => {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Sprawdzenie danych użytkownika przeniesione do [..nextauth].js
  // Poniżej instrukcja powrotu przy próbie bezpośredniego użycia tego API
  res
    .status(200)
    .json({ message: "Please log in using the /api/auth/signin route" });
};

export default loginHandler;
