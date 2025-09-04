import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Articles from "./components/Articles";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EditProfile from "./components/EditProfile";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";

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