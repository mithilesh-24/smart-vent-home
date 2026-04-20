import { useEffect, useState, useCallback } from "react";
import { apiFetch, setToken, removeToken, getToken } from "../lib/api.js";

const SESSION_KEY = "smartvent_session";

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = readSession();
    if (session && getToken()) {
      setUser(session);
    }
    setReady(true);

    const onStorage = (e) => {
      if (e.key === SESSION_KEY) setUser(readSession());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    if (res.success && res.data) {
      setToken(res.data.token);
      const session = res.data.user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(session);
      return { ok: true };
    }
    return { ok: false, error: res.message || "Signup failed" };
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.success && res.data) {
      setToken(res.data.token);
      const session = res.data.user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(session);
      return { ok: true };
    }
    return { ok: false, error: res.message || "Invalid email or password." };
  }, []);

  const logout = useCallback(() => {
    removeToken();
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return { user, ready, isAuthenticated: !!user, signup, login, logout };
}
