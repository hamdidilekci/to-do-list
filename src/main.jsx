import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/Home.jsx";
import "./index.css";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPasswordForm from "./pages/ResetPasswordForm.jsx";
import Profile from "./pages/Profile.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import AppFooter from "./components/layout/AppFooter.jsx";
import ResponsiveAppBar from "./components/layout/ResponsiveAppBar.jsx";
import { BackendProvider } from "./context/backend-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ErrorHandler> */}
      <BackendProvider>
        <ResponsiveAppBar />
        <Routes>
          <Route path="Sign-in" element={<SignIn />} />
          <Route path="Sign-up" element={<SignUp />} />
          <Route path="Forgot-password" element={<ForgotPassword />} />
          <Route path="Reset-password-verify" element={<ResetPasswordForm />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="About-us" element={<AboutUs />} />
          <Route path="*" element={<App />} />
        </Routes>
        <AppFooter />
      </BackendProvider>
      {/* </ErrorHandler> */}
    </BrowserRouter>
  </React.StrictMode>
);
