import { serverInterceptor } from "../config";
import { TmsContext } from "../context/TaskBoardContext";
import useRefreshToken from "./useRefreshToken";
import { useContext, useEffect } from "react";

const useServerInterceptor = () => {
  const refresh = useRefreshToken();
  const { token } = useContext(TmsContext);

  useEffect(() => {
    const reqIntercept = serverInterceptor.interceptors.request.use(
      (config) => {
        console.log("\n in the axios request ", config);
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resIntercept = serverInterceptor.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("\n in the axios response error ");

        const prevRequest = error?.config;
        console.log("\n before requesting a refresh token");
        // console.log({ prevRequestSENT: prevRequest});

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log("\n we are requesting a refresh token");

          prevRequest.sent = true;
          const newToken = await refresh();

          console.log("\n", { newToken: newToken });

          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          console.log("\n after adding the bearer token");
          return serverInterceptor(prevRequest);
        }
        return Promise.reject(prevRequest);
      }
    );

    return () => {
      serverInterceptor.interceptors.response.eject(resIntercept);
      serverInterceptor.interceptors.request.eject(reqIntercept);
    };
  }, [token, refresh]);

  return serverInterceptor;
};

export default useServerInterceptor;
