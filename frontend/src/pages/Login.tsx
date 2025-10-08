// LoginXP.tsx
import { useAuth } from "@/context/auth.context";
import { login } from "@/services/auth.service";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, handleSetToken } = useAuth();
  if (user) return <Navigate to="/" />;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await login(email, password);
      handleSetToken(token);
    } catch (error) {
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-sans">
      <div className="bg-gray-100 border border-gray-400 shadow-2xl rounded w-[500px]">
        <div className="bg-blue-600 text-white font-bold px-6 py-3 rounded-t flex justify-between items-center text-lg">
          <span>Kanban-XP</span>
          <div className="flex space-x-3">
            <button className="w-5 h-5 bg-red-500 rounded-full"></button>
            <button className="w-5 h-5 bg-yellow-400 rounded-full"></button>
            <button className="w-5 h-5 bg-green-500 rounded-full"></button>
          </div>
        </div>

        <div className="p-10 flex flex-col items-center">
          <div className="bg-gray-300 w-28 h-28 rounded-full flex items-center justify-center mb-6">
            <span className="text-6xl text-gray-600 select-none">👤</span>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-6">
            <div>
              <label
                className="block text-gray-700 text-base mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full border border-gray-400 rounded px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-base mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full border border-gray-400 rounded px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow text-lg disabled:opacity-50 cursor-pointer  "
            >
              Iniciar sesión
            </button>
          </form>
          <div className="mt-4  text-center">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Registrate aquí
            </Link>
          </div>
          <div
            className={`text-red-400 h-6 mt-6 text-center ${
              error ? "" : "opacity-0"
            }`}
          >
            {error}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
