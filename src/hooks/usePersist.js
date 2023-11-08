import { useState, useEffect } from "react";

const usePersist = (key) => {
  const [persist, setPersist] = useState(
    () => JSON.parse(localStorage.getItem(key)) || false
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(persist));
  }, [persist, key]);

  return [persist, setPersist];
};

export default usePersist;
