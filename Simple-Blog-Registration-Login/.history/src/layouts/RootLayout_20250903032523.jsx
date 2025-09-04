import { useContext } from "react";
import { MyContext } from "../ContextProvider/MyContext";
import LogOut from "../UI components/LogOut";
import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/sign-in">Sign In</NavLink>
          <NavLink to="/sign-up">Sign Up</NavLink>
          <LogOut />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
