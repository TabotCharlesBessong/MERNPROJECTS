import { useAuth0 } from "@auth0/auth0-react";
import { Button, UserMenu } from "..";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <UserMenu />
      ) : (
        <Button
          className="font-bold hover:text-orange-500 hover:bg-white"
          variant="ghost"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
