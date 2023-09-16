import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ListItemsProvider } from "./components/list/ListItemsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListItemsProvider>
      <App />
    </ListItemsProvider>
  </React.StrictMode>
);
