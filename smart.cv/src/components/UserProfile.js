import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

function UserProfile() {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  if (!user) return <p>Please log in.</p>;

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={() => dispatch(logout())}>Log Out</button>
    </div>
  );
}

export default UserProfile;
