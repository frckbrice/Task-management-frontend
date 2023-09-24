import { useContext } from "react";
import { TmsContext } from "../context/TaskBoardContext";

import { server } from "../config";
import { useLocalStorage } from "./useLocalStorage";

import { useStorage } from "./useStorage";

const useRefreshToken = () => {
  const { setIsRefreshSuccess, setIsRefreshError, setErrorMsg } =
    useContext(TmsContext);

  const { lsData } = useLocalStorage("setRefreshToken");
  const { setStorToken } = useStorage("token", " ");

  console.log(setStorToken);

  const refreshToken = lsData;

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
    if (response && response.status === 200) {
      setStorToken(response?.data?.accessToken);
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
