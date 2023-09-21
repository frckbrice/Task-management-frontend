import { useContext } from "react";
import { TmsContext } from "../context/TaskBoardContext";

import { server } from "../config";

const useRefreshToken = () => {
  const { setToken, refreshToken } = useContext(TmsContext);

  console.log({ old_refresh: refreshToken });

  const refresh = async () => {
    const response = await server.get(
      "/auth/refresh",
      
      {
        headers: {
          Authorization: "Bearer " + refreshToken,
          Accept: "application/json",
        },
      }
    );

    console.log(response);

    setToken((prev) => {
      console.log(prev);
      console.log("new token", response?.data?.accessToken);
      return { ...prev, accessToken: response?.data?.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
