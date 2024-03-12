import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/user";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with the email");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Password is incorrect");
        }

        if (!user.isActive) {
          throw new Error("Account is not activated yet");
        }

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;
      return session;
    },
    // Przykład, jak obsługiwać błędy podczas logowania
    signIn: async ({ user, account, profile, email, credentials }) => {
      if (user && user.isActive) {
        return true;
      } else {
        return false; // Nie zezwól na logowanie, jeśli użytkownik nie jest aktywny
      }
    },
  },
  pages: {
    signIn: "/auth/signin", // Ścieżka do strony logowania, jeśli jest niestandardowa
    error: "/auth/error", // Ścieżka do strony z błędami, jeśli jest niestandardowa
  },
});
