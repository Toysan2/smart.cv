import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    // Logika wysyłania danych do API, np. za pomocą fetch API
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
      const responseData = await response.json();
      if (response.ok) {
        // Przekieruj lub wyświetl komunikat o sukcesie
        console.log("Registration successful", responseData.message);
      } else {
        // Wyświetl komunikat o błędzie
        setErrorMessage(responseData.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(
        "Wystąpił błąd podczas rejestracji. Sprawdź połączenie internetowe i spróbuj ponownie."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="name"
        placeholder="Imię i nazwisko"
        ref={register({ required: true })}
      />
      {errors.name && (
        <span className="error">Pole imię i nazwisko jest wymagane</span>
      )}
      <input
        name="email"
        placeholder="Adres email"
        type="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && (
        <span className="error">Podaj poprawny adres email</span>
      )}
      <input
        name="password"
        placeholder="Hasło"
        type="password"
        ref={register({ required: true, minLength: 8 })}
      />
      {errors.password && (
        <span className="error">Hasło musi mieć co najmniej 8 znaków</span>
      )}
      <button type="submit">Zarejestruj się</button>
      {errorMessage && <span className="error">{errorMessage}</span>}
    </form>
  );
}
