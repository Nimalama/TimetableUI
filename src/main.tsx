import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./assets/sass/style.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId='386932037035-k8v833noqjk7m4***********.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
