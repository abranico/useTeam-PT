import { useAuth } from "@/context/auth.context";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return { children };
};

export default ProtectedRoute;
