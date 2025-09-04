import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../ContextProvider/MyContext";
import LogOut from "../UI components/LogOut";

export default function RootLayout() {
  const { user, isAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();

  const avatar = user?.avatar;
  const username = user?.name;

  return (
    <div>
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="brand">Realworld Blog</Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/new">New Post</Link><img src="/pages/icon.png" />
            <Link to="/settings">Settings</Link>
            {isAuthenticated ? (
              <>
                <button className="linklike" onClick={() => navigate('/settings')}>
                  Settings
                </button>
                <button className="userlink linklike" onClick={() => navigate('/profile')}>
                  {avatar ? (
                    <img src={avatar} alt={username || 'user'} className="avatar" />
                  ) : (
                    <span className="avatar placeholder">{(username || 'U').slice(0,1).toUpperCase()}</span>
                  )}
                  <span>{username}</span>
                </button>
                <LogOut />
              </>
            ) : (
              <>
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-up">Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <div className="hero">
        <h1>Realworld Blog</h1>
        <p>A place to share your knowledge.</p>
      </div>

      <div className="container content">
        <Outlet />
      </div>
    </div>
  );
}
