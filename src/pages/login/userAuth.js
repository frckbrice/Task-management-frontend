import { useStatet, useContext } from "react";
import jwtDecode from 'jwt-decode';
import { TmsContext } from "../../context/TaskBoardContext";


const useAuth = () => {

  const {token} = useContext(TmsContext);


  if(token) {
    const decode = jwtDecode(token);

    const {username, roles} = decode.userInfo
  }

};