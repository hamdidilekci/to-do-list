import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/Home.jsx";
import "./index.css";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Profile from "./pages/Profile.jsx";
import AppFooter from "./components/layout/AppFooter.jsx";
import ResponsiveAppBar from "./components/layout/ResponsiveAppBar.jsx";
import { BackendProvider } from "./context/backend-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <BackendProvider>
        <ResponsiveAppBar />
        <Routes>
          <Route path="Sign-in" element={<SignIn />} />
          <Route path="Sign-up" element={<SignUp />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="*" element={<App />} />
        </Routes>
        <AppFooter />
      </BackendProvider>
    </BrowserRouter>
  </React.StrictMode>
);
