import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Articles from "./components/Articles";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EditProfile from "./components/EditProfile";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";

// ...

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route index element={<Articles/>}/>
          <Route path="new" element={<ProtectedRoute><div>New Post Page</div></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><EditProfile/></ProtectedRoute>} />
          <Route path="sign-in" element={<SignIn/>} />
          <Route path="sign-up" element={<SignUp/>} />
          <Route path="profile" element={<ProtectedRoute><EditProfile/></ProtectedRoute>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </Router>
  );
}
