import { Outlet, Link } from "react-router-dom";

import { useEffect, useRef, useState, useContext } from "react";
import usePersist from "../../hooks/usePersist";

import React from "react";
import PropTypes from "prop-types";
import { TmsContext } from "../../context/TaskBoardContext";
import useRefreshToken from "../../hooks/useRefreshToken";
import PulseLoader from "react-spinners/PulseLoader";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const PersistLogin = (props) => {
  const [persist] = usePersist();
  const { token } = useContext(TmsContext);
  const refresh = useRefreshToken();

  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.lof("verify refresh token");
        try {
          const resp = await refresh();
          const { accessToken } = resp.data;
          console.log({ accessToken });
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
          setErrMsg(error?.data?.message)
        } finally {
          setIsLoading(false);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    //eslint-disable-next-line
  }, []);


  let content;
  if(!persist) {
    console.log('No persist');
    content = <Outlet/>
  }else if(isLoading) {
    console.log("loading");
    content = <PulseLoader color = '#333' />
  }else if(!trueSuccess) {
    console.log('error');
    content = (
      <p className="errMsg">
        {`${errMsg}`}
        <Link to={"/login"} className="persis-logging-msg"> Plese Login again</Link>
      </p>
    );
  }else if(trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token) {
    console.log("token and uninit");
    content = <Outlet />;
  }



  return content;
};

PersistLogin.propTypes = {
  trueSuccess: PropTypes.bool,
  isLoading: PropTypes.bool,
  errMsg: PropTypes.string,
  persist: PropTypes.bool,
  token: PropTypes.string,
  refresh: PropTypes.func,

};

export default PersistLogin;
