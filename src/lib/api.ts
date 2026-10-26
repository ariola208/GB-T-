export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

type Method = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(path: string, method: Method, body?: unknown): Promise<T> {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, (data as any)?.error || `HTTP ${res.status}`);
  return data as T;
}

export const api = {
  get: <T = unknown>(p: string) => request<T>(p, "GET"),
  post: <T = unknown>(p: string, b?: unknown) => request<T>(p, "POST", b),
  put: <T = unknown>(p: string, b?: unknown) => request<T>(p, "PUT", b),
  delete: <T = unknown>(p: string) => request<T>(p, "DELETE"),
};

export const post = (path: string, body: unknown) => api.post(path, body);

export async function upload<T = unknown>(path: string, formData: FormData): Promise<T> {
  const token = localStorage.getItem("token");
  if (!token) throw new ApiError(401, "Session expirée.");
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, (data as any)?.error || `HTTP ${res.status}`);
  return data as T;
}
