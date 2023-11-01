import jwtDecode from "jwt-decode";
import { useStorage } from "./useStorage";

const useAuth = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("currentUser: " + currentUser);
  if (currentUser && !token) {
    const { username, roles, picture, email, googleId } = currentUser;
    return { username, roles, picture, email, googleId };
  } else if (token) {
    const decode = jwtDecode(token);
    if (decode.userInfo !== undefined) {
      const { username, roles, picture, email } = decode.userInfo;

      return { username, roles, picture, email };
    }
  }

  return { username: "", roles: "", picture: "", email: "" };
};

export default useAuth;
