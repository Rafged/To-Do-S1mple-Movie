import { createContext, useState } from "react";

export const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <MyContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </MyContext.Provider>
  );
}