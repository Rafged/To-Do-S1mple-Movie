import LogOut from "../UI components/LogOut";
import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";

export default function RootLayout() {
  const { user, isAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          {!isAuthenticated && <NavLink to="/sign-in">Sign In</NavLink>}
          {!isAuthenticated && <NavLink to="/sign-up">Sign Up</NavLink>}
          {isAuthenticated && (
            <>
              <span>{user?.username}</span>
              <LogOut />
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}