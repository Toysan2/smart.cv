import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
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

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const responseData = await response.json();
      alert(responseData.message); // Pokaż sukces poprzez alert, ale możesz to zastąpić bardziej zaawansowaną logiką interfejsu użytkownika.
      router.push("/login"); // Przekieruj do logowania po pomyślnej rejestracji.
    } catch (error) {
      console.error("Registration failed", error);
      setErrorMessage(error.message || "An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Fields */}
      {errorMessage && <p>{errorMessage}</p>}
      <button type="submit">Register</button>
    </form>
  );
}
