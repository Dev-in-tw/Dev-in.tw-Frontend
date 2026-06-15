export const TOKEN_KEY = "token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null; // SSR / route handler 安全
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as string;
  } catch {
    return raw;
  }
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}
