import React from "react";

const LogoutButton = () => {
  const logout = async () => {
    const domain = "dev-j7x6c1vxg800lx2o.us.auth0.com";
    const clientId = "loOgzh5zsQXaSjhFFcK6ios8Wwo2xtdY";
    const returnTo = "http://localhost:5137";

    const response = await fetch(
      `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
      { redirect: "manual" }
    );

    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => logout()}>
      Log out
    </button>
  );
};

export default LogoutButton;