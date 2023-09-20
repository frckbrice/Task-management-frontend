import { useContext } from "react";
import { TmsContext } from "../context/TaskBoardContext";

import { server } from "../config";

const useRefreshToken = () => {
  const { setToken } = useContext(TmsContext);

  const refresh = async () => {
    const response = server.get("/auth/refresh", {
      withCredentials: true,
    });

    setToken((prev) => {
      console.log(prev);
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return (await response).data;
  };
  return refresh;
};

export default useRefreshToken;