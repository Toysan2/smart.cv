import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/user/userSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {!isLoggedIn ? (
        <>
          <li className="nav-item">
            <Link href="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link href="/register">Register</Link>
          </li>
        </>
      ) : (
        <li className="nav-item">
          <button
            className="nav-link"
            style={{ cursor: "pointer", background: "none", border: "none" }}
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </li>
      )}
    </nav>
  );
};

export default Navbar;
