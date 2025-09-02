import { useState } from "react";
import { MyContext } from "./MyContext";

export default function ContextProvider({ children }) {
  const [user, setUser] = useState({ name: null, avatar: null });

  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
}
