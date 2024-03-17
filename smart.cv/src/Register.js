import React from "react";
import { useNavigate } from "react-router-dom"; // Updated import

function Register() {
  const navigate = useNavigate(); // Updated line

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    // TODO: Call API to register
    // After successful registration, use navigate to redirect
    navigate("/login"); // Updated line
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
