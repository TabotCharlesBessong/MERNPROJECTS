import { FC, ReactNode } from "react";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const Auth0ProviderWithNavigate: FC<Props> = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  // const clientSecret = import.meta.env.VITE_AUTH0_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  if (!domain || !clientId || !redirectUri)
    throw new Error("Unable to initialise auth");
  const navigate = useNavigate()
  const onRedirectCallback = (appState?:AppState,user?:User) => {
    // console.log("USER",user)
    navigate("/auth-callback")
  }
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
