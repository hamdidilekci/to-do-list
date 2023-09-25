// Create a new context for the avatar URL
import React, { createContext, useContext, useState } from "react";

const AvatarContext = createContext();

export const useAvatar = () => {
  return useContext(AvatarContext);
};

export const AvatarProvider = ({ children }) => {
  const [avatarUrl, setAvatarUrl] = useState(""); // Initialize with an empty string

  return (
    <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
      {children}
    </AvatarContext.Provider>
  );
};
