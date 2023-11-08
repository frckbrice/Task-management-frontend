import jwtDecode from "jwt-decode";
import { useStorage } from "./useStorage";

const useAuth = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  console.log("currentUser info: " + currentUser.userInfo);
  if (currentUser) {
    const { username, roles, picture, email, googleId } = currentUser;
    return { username, roles, picture, email, googleId };
  }

  if (currentUser.userInfo) {
    const { username, roles, picture, email, googleId } = currentUser.userInfo;
    return { username, roles, picture, email, googleId };
  }
  //  else if (token) {
  //   const decode = jwtDecode(token);
  //   if (decode.userInfo !== undefined) {
  //     const { username, roles, picture, email } = decode.userInfo;

  //     return { username, roles, picture, email };
  //   }
  // }

  return { username: "", roles: "", picture: "", email: "" };
};

export default useAuth;
