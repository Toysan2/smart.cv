import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  verificationToken: String, // for email verification
  verified: {
    type: Boolean,
    default: false,
  },
  // Add any additional fields as needed
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
