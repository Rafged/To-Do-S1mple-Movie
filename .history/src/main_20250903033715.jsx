import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/fonts.css";
import "./assets/styles.css";
import App from "./App.jsx";
import ContextProvider from "./ContextProvider/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
