import { createContext, useContext, useState } from "react";

const ListItemsContext = createContext();

export const useListItems = () => {
  return useContext(ListItemsContext);
};

export const ListItemsProvider = ({ children }) => {
  const [listItems, setListItems] = useState([]);
  console.log("listItems", listItems);

  return (
    <ListItemsContext.Provider value={{ listItems, setListItems }}>
      {children}
    </ListItemsContext.Provider>
  );
};
