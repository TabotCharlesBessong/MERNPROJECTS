import { removeAccessToken } from "./token";

export const logoutUser = () => {
  removeAccessToken();
  // Optionally call backend logout mutation
  window.location.href = "/login";
};
