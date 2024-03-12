import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/user";

export default async function verifyEmail(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET requests are accepted." });
  }

  try {
    await dbConnect();

    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Missing token." });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or already verified." });
    }

    user.verified = true;
    user.verificationToken = undefined; // Remove verification token
    await user.save();

    res.status(200).json({ message: "Email successfully verified." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
}
