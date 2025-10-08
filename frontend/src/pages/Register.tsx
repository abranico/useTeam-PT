import { useAuth } from "@/context/auth.context";
import { register } from "@/services/auth.service";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router";

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  register?: string;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, handleSetToken } = useAuth();
  if (user) return <Navigate to="/" />;

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!email.trim()) newErrors.email = "El email es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "El email no es válido.";

    if (!password) newErrors.password = "La contraseña es obligatoria.";
    else if (password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";

    if (!confirmPassword)
      newErrors.confirmPassword = "Debes repetir la contraseña.";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      await register(name, email, password);
      toast.loading("Registro exitoso, redireccionando al login...", {
        duration: 3000,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate("/login");
    } catch (error: any) {
      console.log({ error: error.message });
      if (error.message === "Conflict") {
        setErrors({ register: "El email ya esta registrado" });
      } else {
        setErrors({ register: "Error al registrar el usuario" });
      }
      toast.error("Error al registrar el usuario");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen font-sans">
      <div className="bg-gray-100 border border-gray-400 shadow-2xl rounded w-[500px]">
        {/* Barra de título */}
        <div className="bg-blue-600 text-white font-bold px-6 py-3 rounded-t flex justify-between items-center text-lg">
          <span>Kanban-XP - Registro</span>
          <div className="flex space-x-3">
            <button className="w-5 h-5 bg-red-500 rounded-full"></button>
            <button className="w-5 h-5 bg-yellow-400 rounded-full"></button>
            <button className="w-5 h-5 bg-green-500 rounded-full"></button>
          </div>
        </div>

        {/* Contenido de la ventana */}
        <div className="p-10 flex flex-col items-center">
          {/* Icono de usuario */}
          <div className="bg-gray-300 w-28 h-28 rounded-full flex items-center justify-center mb-6">
            <span className="text-6xl text-gray-600 select-none">👤</span>
          </div>

          {/* Formulario */}
          <form onSubmit={handleRegister} className="w-full space-y-4">
            <div>
              <label className="block text-gray-700 text-base mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className={`w-full border rounded px-3 py-2 text-base focus:outline-none focus:ring-1 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-400 focus:ring-blue-500"
                }`}
              />

              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className={`w-full border rounded px-3 py-2 text-base focus:outline-none focus:ring-1 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-400 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className={`w-full border rounded px-3 py-2 text-base focus:outline-none focus:ring-1 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-400 focus:ring-blue-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className={`w-full border rounded px-3 py-2 text-base focus:outline-none focus:ring-1 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-400 focus:ring-blue-500"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Botones */}
            <div className="flex justify-between mt-4 space-x-2">
              <button
                disabled={loading}
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow text-lg disabled:opacity-50 cursor-pointer"
              >
                Registrar
              </button>
            </div>
          </form>

          <div className="text-gray-600 mt-4 text-center">
            ¿Ya tenés cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Inicia sesion aquí
            </Link>
          </div>
          <div
            className={`text-red-400 h-6 mt-6 text-center ${
              errors.register ? "" : "opacity-0"
            }`}
          >
            {errors.register}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
