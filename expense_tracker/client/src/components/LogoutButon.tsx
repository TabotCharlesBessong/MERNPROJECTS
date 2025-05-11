import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { removeAccessToken } from "../utils/token";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeAccessToken();
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-white bg-red-600 hover:bg-red-700 py-1 px-3 rounded-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
