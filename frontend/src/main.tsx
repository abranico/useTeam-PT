import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./router/routes.ts";
import AuthContextProvider from "./context/auth.context.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1e1e1e",
            color: "#fff",
            fontSize: "1rem",
            padding: "16px 20px",
            borderRadius: "8px",
          },
          success: {
            iconTheme: {
              primary: "#4ade80", // verde
              secondary: "#1e1e1e",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171", // rojo
              secondary: "#1e1e1e",
            },
          },
          loading: {
            iconTheme: {
              primary: "#60a5fa", // azul
              secondary: "#1e1e1e",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
