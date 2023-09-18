import { createContext, useContext, useState } from "react";

const ListItemsContext = createContext();

export const useListItems = () => {
  return useContext(ListItemsContext);
};

export const ListItemsProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [completed, setCompleted] = useState(false);

  return (
    <ListItemsContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        priority,
        setPriority,
        category,
        setCategory,
        completed,
        setCompleted,
      }}
    >
      {children}
    </ListItemsContext.Provider>
  );
};
