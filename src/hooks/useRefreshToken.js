import { useContext } from "react";
import { TmsContext } from "../context/TaskBoardContext";

import { server } from "../config";
import { useLocalStorage } from "./useLocalStorage";

import {useStorage} from "./useStorage";


const useRefreshToken = () => {
  const { setIsRefreshSuccess, setIsRefreshError, setErrorMsg } =
    useContext(TmsContext);

  const { lsData } = useLocalStorage("setRefreshToken");
  const { setstorToken } = useStorage("token");

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
      setstorToken((prev) => {
        console.log({ old_refresh: prev });
        console.log("new token", response?.data?.accessToken);
        return { ...prev, accessToken: response?.data?.accessToken };
      });
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
