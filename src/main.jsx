import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ListItemsProvider } from "./components/list/ListItemsContext.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import AppFooter from "./modules/views/AppFooter.jsx";
import ResponsiveAppBar from "./modules/views/ResponsiveAppBar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListItemsProvider>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="Sign In" element={<SignIn />} />
          <Route path="Sign Up" element={<SignUp />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
          <Route path="*" element={<App />} />
        </Routes>
        <AppFooter />
      </BrowserRouter>
    </ListItemsProvider>
  </React.StrictMode>
);
