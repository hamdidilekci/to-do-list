import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Profile from "./pages/Profile.jsx";
import AppFooter from "./modules/views/AppFooter.jsx";
import ResponsiveAppBar from "./modules/views/ResponsiveAppBar.jsx";
import { BackendProvider } from "./backend-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BackendProvider>
        <ResponsiveAppBar />
        <Routes>
          <Route path="Sign In" element={<SignIn />} />
          <Route path="Sign Up" element={<SignUp />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<App />} />
        </Routes>
        <AppFooter />
      </BackendProvider>
    </BrowserRouter>
  </React.StrictMode>
);
