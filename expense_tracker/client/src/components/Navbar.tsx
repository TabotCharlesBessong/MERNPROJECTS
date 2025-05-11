import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";

import LogoutButton from "./LogoutButon";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold">
          💸 ExpenseTracker
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/add-expense" className="hover:underline">
                Add Expense
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
