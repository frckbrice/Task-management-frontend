import { useEffect, useState } from "react";

const useClickOutside = (ref) => {
  const [isOutside, setIsOutside] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOutsideCLick = (event) => {
    setIsOutside(ref.current && !event.target.contains(ref.current));
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideCLick);
  }, [ref, handleOutsideCLick]);

  return isOutside;
};

export default useClickOutside;
