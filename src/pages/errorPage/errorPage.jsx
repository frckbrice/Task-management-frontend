import { useRouteError } from "react-router-dom";

import React from 'react'

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="errorpage">
      <h1>Oop!</h1>
      <p>An unexpected Error occured</p>
      <p>
        <i>{error.status || error.statusText}</i>
        <i>{error.data || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage
