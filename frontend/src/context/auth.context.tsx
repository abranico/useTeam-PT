import Loader from "@/components/shared/Loader";
import type { LoginResponse } from "@/models/loginResponse.model";
import type { User } from "@/models/user.model";
import ApiClient from "@/utils/api-client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface Context {
  apiClient: ApiClient | null;
  handleSetToken: (token: string | null) => void;
  user: User | null;
  logout: () => void;
}

export const AuthContext = createContext<Context | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("kanban-xp_token");
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  let apiClient = token ? new ApiClient(token) : null;

  const handleSetToken = (newToken: string | null) => {
    if (newToken) localStorage.setItem("kanban-xp_token", newToken);
    else localStorage.removeItem("kanban-xp_token");
    setToken(newToken);
  };

  const logout = () => {
    handleSetToken(null);
    setUser(null);
    apiClient = null;
  };

  useEffect(() => {
    if (!token || !apiClient) {
      setUser(null);
      setLoading(false); // si no hay token, ya no cargamos user
      return;
    }

    apiClient
      .get<User>("auth/me")
      .then((data) => setUser(data))
      .catch(() => {
        handleSetToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <Loader />;

  return (
    <AuthContext.Provider value={{ apiClient, handleSetToken, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
