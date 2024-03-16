import { hashPassword } from "@/utils/authUtils";
import User from "@/model/user";
import dbConnect from "@/utils/dbConnect";

const authHandler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await hashPassword(password);

      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default authHandler;
