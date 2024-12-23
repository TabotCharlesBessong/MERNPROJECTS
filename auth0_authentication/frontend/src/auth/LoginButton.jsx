import React from "react";

const LoginButton = () => {
  const login = async () => {
    const domain = "dev-j7x6c1vxg800lx2o.us.auth0.com";
    const audience = "https://www.challenges_api.com";
    const scope = "read:challenges";
    const clientId = "loOgzh5zsQXaSjhFFcK6ios8Wwo2xtdY";
    const responseType = "code";
    const redirectUri = "http://localhost:5137/challenges";

    const response = await fetch(
      `https://${domain}/authorize?` + 
      `audience=${audience}&` + 
      `scope=${scope}&` +
      `response_type=${responseType}&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}`, {
        redirect: "manual"
      }
    );

    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => login()}>
      Log In
    </button>
  );
};

export default LoginButton;