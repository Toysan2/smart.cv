import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const result = await signIn("credentials", {
      redirect: false, // Zapobiega automatycznemu przekierowaniu
      email,
      password,
    });

    if (!result.error) {
      // Przekieruj do strony profilu lub dashboardu po pomyślnym logowaniu
      window.location.href = "/profile";
    } else {
      // Obsługa błędów logowania, np. wyświetl komunikat błędu
      console.error("Login failed:", result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Log in</button>
    </form>
  );
}
