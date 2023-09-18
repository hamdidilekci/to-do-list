import React from "react";
import List from "./components/list/List.jsx";
import { ListItemsProvider } from "./components/list/ListItemsContext.jsx";

function App() {
  return (
    <div style={{ minHeight: "700px" }}>
      <ListItemsProvider>
        <List />
      </ListItemsProvider>
    </div>
  );
}

export default App;
