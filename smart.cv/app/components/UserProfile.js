import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/user/userSlice";

export default function UserProfile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      {user.isLoggedIn ? (
        <>
          <p>Welcome, {user.userData.name}!</p>
          <button onClick={() => dispatch(logout())}>Log Out</button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}
