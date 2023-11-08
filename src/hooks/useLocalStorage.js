import React from "react";

export function useLocalStorage(key, intialValue) {
  const [lsData, setlsData] = React.useState(() => {
    return JSON.parse(localStorage.getItem(key)) || intialValue;
  });

  const setLocalStoragelsData = React.useCallback(
    (lsData) => {
      setlsData(() => {
        if (lsData) {
          localStorage.setItem(key, JSON.stringify(lsData));
        } else {
          console.log("no lsData to store in local storage");
          return;
        }

        return lsData;
      });
    },
    [key]
  );

  React.useEffect(() => {
    setLocalStoragelsData(lsData);

    const refreshStorageFunc = (event) => {
      if (event.key === key) {
        setlsData(event.newlsData);
      }
    };
    window.addEventListener("storage", refreshStorageFunc);

    return () => {
      window.removeEventListener("storage", refreshStorageFunc);
    };
  }, [key, setLocalStoragelsData, lsData]);

  return { lsData, setlsData: setLocalStoragelsData };
}
