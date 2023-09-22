import { useState, useEffect } from "react";

const usePersist = (key) => {
  const [persist, setPersist] = useState(
    () => JSON.parse(localStorage.getItem(key)) || false
  );

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};

export default usePersist;
