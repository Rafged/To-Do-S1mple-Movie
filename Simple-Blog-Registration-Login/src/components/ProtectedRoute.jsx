import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MyContext } from "../ContextProvider/MyContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(MyContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }
  return children;
}
