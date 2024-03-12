import { NextResponse } from "next/server";

export function middleware(request) {
  const { token } = request.cookies;

  // Sprawdź, czy token istnieje, jeśli nie, przekieruj na stronę logowania
  if (!token) {
    return NextResponse.redirect("/login");
  }

  // Kontynuuj normalne przetwarzanie żądania
  return NextResponse.next();
}
