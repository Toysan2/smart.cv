import { signIn } from "next-auth/react";

export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Attempt to sign in
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result.error) {
      // Redirect to profile or dashboard page
      window.location.href = "/profile";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" required />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" required />
      <button type="submit">Log in</button>
    </form>
  );
}
