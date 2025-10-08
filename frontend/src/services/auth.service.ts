import { config } from "@/config";
import type { LoginResponse } from "@/models/loginResponse.model";

const apiUrl = config.API_URL;

export const me = (token: string) => {
  return fetch(`${apiUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (!res.ok) throw new Error("Error al consumir la API");
    return res.json();
  });
};

export const login = (email: string, password: string) => {
  return fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) throw new Error("Error al consumir la API");
    return res.text();
  });
};

export const register = (name: string, email: string, password: string) => {
  return fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .catch((error) => {
      throw error;
    });
};
