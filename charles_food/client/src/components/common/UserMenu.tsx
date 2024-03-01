import { CircleUserRound } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from "..";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const { user,logout } = useAuth0();
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500 " />
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 mt-6 px-2" >
        <DropdownMenuItem>
          <Link to="/profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Link to="/restaurant" className="font-bold hover:text-orange-500">
            My Restaurants
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button onClick={async ()=> await logout()} className="flex flex-1 font-bold bg-orange-500" >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
