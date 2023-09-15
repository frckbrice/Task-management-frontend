import { createContext, useState } from "react";

export const TmsContext = createContext({});

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [projectname, setProjectname] = useState("");
  const [userData, setUserData] = useState("");
    const [email, setEmail] = useState("");

  const values = {
    token,
    setToken,
    projectname,
    setProjectname,
    userData,
    setUserData,
    email,
    setEmail,
  };

  return <TmsContext.Provider value={values}>{children} </TmsContext.Provider>;
};

export default ContextProvider;
