import { validatePassword, generateToken } from "@/utils/authUtils";
import User from "@/model/user";
import dbConnect from "@/utils/dbConnect";

export default async function loginHandler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      const isValid = await validatePassword(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      const token = generateToken(user);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
