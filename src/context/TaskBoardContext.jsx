
import { createContext, useState } from "react";

export const TmsContext = createContext({});

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [projectname, setProjectname] = useState("");

  const values = { token, setToken, projectname, setProjectname };

  return <TmsContext.Provider value={values}>{children} </TmsContext.Provider>;
};


