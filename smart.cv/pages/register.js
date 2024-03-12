export default function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Tu implementacja logiki rejestracji (np. fetch do API /api/auth/register)
    alert("Registration form submitted. Implement the logic to register user.");
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
