import Link from "next/link";

export default function Verified() {
  return (
    <div>
      <h1>Email Verified Successfully!</h1>
      <p>Your email has been successfully verified. You can now log in.</p>
      <Link href="/login">
        <a>Log in</a>
      </Link>
    </div>
  );
}
