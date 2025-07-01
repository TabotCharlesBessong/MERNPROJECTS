import React from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

const Header: React.FC = () => {
  const { isSignedIn, user } = useUser();

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>BMI Calculator</h1>
        <div className="auth-section">
          {isSignedIn ? (
            <div className="user-info">
              <span>
                Welcome, {user.firstName || user.emailAddresses[0].emailAddress}
                !
              </span>
              <SignOutButton>
                <button className="auth-button signout">Sign Out</button>
              </SignOutButton>
            </div>
          ) : (
            <SignInButton>
              <button className="auth-button signin">Sign In</button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
