import { createContext, useState } from "react";

export const ProgressContext = createContext({});

const ProgressContextProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const values = {
    progress,
    setProgress,
  };

  return (
    <ProgressContext.Provider value={values}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContextProvider;
