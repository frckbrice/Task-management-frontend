import { createContext, useState } from "react";

export const TmsContext = createContext({});

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [projectData, setProjectData] = useState({});
  const [userData, setUserData] = useState({});
  const [taskdata, setTaskdata] = useState({});
  const [email, setEmail] = useState("");

  console.log(token);

  const values = {
    token,
    setToken,
    // projectname,
    // setProjectname,
    userData,
    setUserData,
    email,
    setEmail,
    taskdata,
    setTaskdata,
  };

  return <TmsContext.Provider value={values}>{children} </TmsContext.Provider>;
};

export default ContextProvider;