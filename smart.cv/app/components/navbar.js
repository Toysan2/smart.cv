import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!loggedIn);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <span className="navbar-brand" style={{ cursor: "pointer" }}>
            Smart.CV
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link href="/login">
                    <span className="nav-link" style={{ cursor: "pointer" }}>
                      Login
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/register">
                    <span className="nav-link" style={{ cursor: "pointer" }}>
                      Register
                    </span>
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
