import { createContext, useContext } from "react";

// create a context
const taskBoardContext = createContext();

export default function TaskBoardProvider() {
  const value = {};

  return <taskBoardContext.Provider value={value}></taskBoardContext.Provider>;
}

export const useTaskBoardContext = () => useContext(taskBoardContext);
