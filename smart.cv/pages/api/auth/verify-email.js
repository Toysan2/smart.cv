import dbConnect from "@/utils/dbConnect";
import User from "@/model/user";

export default async function verifyEmail(req, res) {
  await dbConnect();

  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET requests are accepted." });
  }

  try {
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
    user.verificationToken = undefined;
    await user.save();

    res.writeHead(302, { Location: "/verified" });
    res.end();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
}
