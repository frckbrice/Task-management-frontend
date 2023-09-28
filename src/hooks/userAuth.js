
import jwtDecode from 'jwt-decode';


const userAuth = (token) => {

  

  if (token) {
    const decode = jwtDecode(token);

    const { username, roles, picture, email } = decode.userInfo;
   
    return { username, roles, picture, email };
  }

  return { username: "", roles: "", picture: "", email: "" };
};

export default userAuth;