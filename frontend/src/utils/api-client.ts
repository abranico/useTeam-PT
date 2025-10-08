import { config } from "@/config";

const apiUrl = config.API_URL;

class ApiClient {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${apiUrl}/${url}`, {
      ...options,
      headers: {
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      let errorMessage = `Error ${response.statusText}: ${response.status}`;
      try {
        const data = await response.json();
        errorMessage = data.error || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType?.includes("application/json")) return await response.json();
    return response.text() as unknown as T;
  }

  get<T>(url: string) {
    return this.request<T>(url, { method: "GET" });
  }

  post<T>(url: string, body = {}) {
    return this.request<T>(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  put<T>(url: string, body = {}) {
    return this.request<T>(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  delete<T>(url: string) {
    return this.request<T>(url, { method: "DELETE" });
  }
}

export default ApiClient;
