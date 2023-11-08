import { useRouteError, Link } from "react-router-dom";
import "./errorPage.css";

import React from "react";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    // <center>
    <div className="errorpage">
      <h1>Oop!</h1>
      <p>An unexpected Error occured</p>
      <p>
        Error message: <i>{error.status || error.statusText}</i>
        <i>{error.data || error.message}</i>
      </p>
      <Link to="/">Visit Our Homepage</Link>
    </div>
    // </center>
  );
};

export default ErrorPage;
