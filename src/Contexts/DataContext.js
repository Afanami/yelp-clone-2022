import React, { createContext } from "react";
import useSearch from "../Hooks/useSearch";

export const DataContext = createContext({
  businessData: null,
  error: null,
});

export function BusinessDataProvider({ children }) {
  const { businessData, error } = useSearch();

  return (
    <DataContext.Provider value={{ businessData, error }}>
      {children}
    </DataContext.Provider>
  );
}
