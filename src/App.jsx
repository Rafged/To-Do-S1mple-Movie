
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Blog from "./components/Blog";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EditProfile from "./components/EditProfile";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route index element={<Blog/>}/>
          <Route path="new" element={<div>New Post Page</div>} />
          <Route path="settings" element={<EditProfile/>} />
          <Route path="signin" element={<SignIn/>} />
          <Route path="signup" element={<SignUp/>} />
          <Route path="profile" element={<div>User Profile</div>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </Router>
  );
}
