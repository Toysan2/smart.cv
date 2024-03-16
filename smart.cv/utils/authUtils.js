const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("@/model/user"); // Upewnij się, że ścieżka do modelu jest poprawna

// Hashowanie hasła
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Sprawdzanie hasła
async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// Generowanie tokena JWT
function generateToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

module.exports = {
  hashPassword,
  validatePassword,
  generateToken,
};
