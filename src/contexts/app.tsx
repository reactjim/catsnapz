import React, { createContext } from "react";
import { v4 as uuid } from "uuid";

interface AppContext {
  userId: string | null;
}

export const AppContext = createContext<Partial<AppContext>>({});

export const AppProvider: React.FC = ({ children }) => {
  const userId: string | null = localStorage.getItem("user_id");

  if (!userId) {
    localStorage.setItem("user_id", uuid());
  }

  return (
    <AppContext.Provider value={{ userId }}>{children}</AppContext.Provider>
  );
};
