import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App.tsx";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
