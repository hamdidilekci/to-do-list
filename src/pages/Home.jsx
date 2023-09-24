import React from "react";
import List from "../components/list/List.jsx";
import { ListItemsProvider } from "../context/ListItemsContext.jsx";

function Home() {
  return (
    <div style={{ minHeight: "700px" }}>
      <ListItemsProvider>
        <List />
      </ListItemsProvider>
    </div>
  );
}

export default Home;
