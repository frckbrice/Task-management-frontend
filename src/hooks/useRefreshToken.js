import { useContext } from "react";
import { TmsContext } from "../context/TaskBoardContext";

import { server } from "../config";

const useRefreshToken = () => {
  const { setIsRefreshSuccess, setIsRefreshError, setErrorMsg } =
    useContext(TmsContext);

  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

  const refresh = async () => {
    const response = await server.get(
      "/auth/refresh",

      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          Accept: "application/json",
        },
      }
    );
    console.log(response);
    if (response && response.data) {
      localStorage.setItem(
        "token",
        JSON.stringify(response?.data?.accessToken)
      );
      setIsRefreshSuccess(true);
      return response.data.accessToken;
    } else if (response.statusText !== "OK") {
      console.log("Error refreshing token");
      setIsRefreshError(true);
      setErrorMsg("error refreshing token");
    }
  };
  return refresh;
};

export default useRefreshToken;
