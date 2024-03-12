import { useSelector, useDispatch } from "react-redux";

export default function UserProfile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      {user.isLoggedIn ? (
        <>
          <p>Welcome, {user.userData.name}!</p>
          <button onClick={logOut}>Log Out</button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}
