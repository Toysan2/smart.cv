import { useEffect } from "react";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      // Call API endpoint to verify token
      fetch(`/api/auth/verify-email?token=${token}`)
        .then((res) => res.json())
        .then(({ message }) => {
          alert(message);
          // Redirect user after verification
          router.push("/login");
        })
        .catch((error) => console.error("Verification error:", error));
    }
  }, [token, router]);

  return <div>Verifying...</div>;
};

export default VerifyEmail;
