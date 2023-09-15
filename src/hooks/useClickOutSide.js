import { useEffect, useState } from "react";

const useOutSideClick = (ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        console.log("listener function is working currectly");

        return;
      } else setIsModalOpen(false);
    };

    window.addEventListener("click", listener);

    return () => {
      window.removeEventListener("click", listener);
    };
  }, [ref]);

  return {
    isModalOpen,
    setIsModalOpen,
  };
};

export default useOutSideClick;
