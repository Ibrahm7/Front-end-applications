import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Router from "./components/Router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./index.css";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import UserContextProvider, { UserContext } from "./contexts/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </ThemeContextProvider>
  </StrictMode>,
);
