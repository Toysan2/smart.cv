import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/userSlice";
import { useNavigate } from "react-router-dom"; // Updated import

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Updated line

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    // Call API to login
    // For demonstration, dispatch login action directly
    dispatch(login(userData));
    navigate("/profile"); // Updated line
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
