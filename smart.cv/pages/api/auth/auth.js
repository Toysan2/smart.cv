import Joi from "joi";
import bcrypt from "bcryptjs";
import User from "../../../model/user"; // Upewnij się, że ścieżka do modelu jest poprawna
import dbConnect from "../../../utils/dbConnect";

const authHandler = async (req, res) => {
  // Nawiązanie połączenia z bazą danych
  await dbConnect();

  const { method } = req;

  if (method === "POST") {
    try {
      // Walidacja ciała żądania
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });

      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Hashowanie hasła
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Utworzenie nowego użytkownika
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      // Zapisanie użytkownika w bazie danych
      await user.save();

      // Odpowiedź sukcesu
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      // Obsługa błędu serwera
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    // Obsługa innych metod HTTP
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default authHandler;
