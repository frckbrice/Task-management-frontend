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
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
          config.headers["Accept"] = "application/json";
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resIntercept = serverInterceptor.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config;
        if (error?.response?.status === 403 || !prevReq?.sent) {
          prevReq.sent = true;
          const newToken = await refresh();
          prevReq.headers["Authorization"] = `Bearer ${newToken}`;
         
          return serverInterceptor(prevReq);
        }
        return Promise.reject(prevReq);
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