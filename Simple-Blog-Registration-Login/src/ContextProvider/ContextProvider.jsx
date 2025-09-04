import { useEffect, useMemo, useState } from "react";
import { MyContext } from "./MyContext";

export default function ContextProvider({ children }) {
  const [user, setUser] = useState({ name: null, avatar: null, token: null });

  // Initialize from localStorage to persist session on reload
  useEffect(() => {
    const name = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");
    const token = localStorage.getItem("token");
    if (name || token) {
      setUser({ name: name || null, avatar: avatar || null, token: token || null });
    }
  }, []);

  const login = (payload) => {
    const { username, token, image } = payload || {};
    localStorage.setItem("username", username || "");
    localStorage.setItem("token", token || "");
    if (image) localStorage.setItem("avatar", image);
    setUser({ name: username || null, avatar: image || null, token: token || null });
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.removeItem("token");
    setUser({ name: null, avatar: null, token: null });
  };

  const value = useMemo(() => ({
    user,
    setUser,
    isAuthenticated: !!user?.token,
    login,
    logout,
  }), [user]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
