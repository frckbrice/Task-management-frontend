import jwtDecode from "jwt-decode";
import { useStorage } from "./useStorage";

const useAuth = () => {
  const currentUser = localStorage.getItem("currentUser");
  const { token } = useStorage("token");

  if (!token && currentUser) {
    const { username, roles, picture, email } = currentUser;
    return { username, roles, picture, email };
  } else if (token) {
    const decode = jwtDecode(token);
    if (decode.userInfo !== undefined) {
      const { username, roles, picture, email } = decode.userInfo;

      return { username, roles, picture, email };
    }
  }
};

export default useAuth;
