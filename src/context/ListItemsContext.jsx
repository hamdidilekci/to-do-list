import React, { createContext, useContext, useState } from "react";

const ListItemsContext = createContext();

export const useListItems = () => {
  return useContext(ListItemsContext);
};

export const ListItemsProvider = ({ children }) => {
  const [rows, setRows] = useState([]);

  return (
    <ListItemsContext.Provider
      value={{
        rows,
        setRows,
      }}
    >
      {children}
    </ListItemsContext.Provider>
  );
};
