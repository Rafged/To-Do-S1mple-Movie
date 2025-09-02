
import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="brand">Realworld Blog</Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/new">New Post</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/profile">en19mu5</Link>
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
