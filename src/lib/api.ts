export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const post = async (path: string, body: unknown) => {
  const r = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || String(r.status));
  return d;
};
