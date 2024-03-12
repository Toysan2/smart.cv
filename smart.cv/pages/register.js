export default function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Send a POST request to the register API endpoint
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle success (e.g., redirecting to login page or showing a success message)
      console.log("Registration successful", data.message);
      // Redirect or show success message
    } else {
      // Handle errors (e.g., showing an error message)
      console.error("Registration failed", data.error);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" required />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" required />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" required />
      <button type="submit">Register</button>
    </form>
  );
}
