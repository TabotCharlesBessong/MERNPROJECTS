import { createContext, useState } from "react";
import * as userService from "../services/userServices";
import { toast } from "react-toastify";
import { useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const register = async (data) => {
    try {
      const user = await userService.register(data)
      setUser(user)
      toast.success('Registered user successfully')
      console.log(data)
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success("Logout Successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)
