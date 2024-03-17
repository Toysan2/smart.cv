import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true, // This implicitly creates an index on the email field
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  verificationToken: String,
  verified: {
    type: Boolean,
    default: false,
  },
  // Add any additional fields as needed
});

// Explicitly creating an index on the email field for better query performance
UserSchema.index({ email: 1 });

export default mongoose.models.User || mongoose.model("User", UserSchema);
