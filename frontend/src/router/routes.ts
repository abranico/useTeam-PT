import { createBrowserRouter } from "react-router";

import App from "@/App";
import Dashboard from "@/pages/Dashboard";
import Board from "@/pages/Board";
import Login from "@/pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Dashboard },
      { path: "/board/:id", Component: Board },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
]);
