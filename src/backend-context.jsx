import React, { createContext, useContext, useRef } from "react";

// helpers
import Backend from "./backend.js";

const BackendContext = createContext();

function useBackend() {
  return useContext(BackendContext);
}

function BackendProvider({ children }) {
  const backend = useRef(new Backend(import.meta.env.VITE_BACKEND_URL));
  return (
    <BackendContext.Provider value={backend.current}>
      {children}
    </BackendContext.Provider>
  );
}

export { useBackend, BackendProvider };
