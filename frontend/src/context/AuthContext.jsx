import { createContext, useContext, useState } from "react";
import { MOCK_USER } from "../data/mockData";

// ─── AuthContext ──────────────────────────────────────────────────────────────
// Manages who is logged in. Wrap your whole app with <AuthProvider> so any
// component can call useAuth() to read or change the auth state.
//
// Milestone 3: swap the mock logic inside login() and register() for real
// fetch() calls to POST /api/auth/login and POST /api/auth/register.

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);   // null = not logged in
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  // Simulates a login API call with mock data.
  async function login({ email, password }) {
    setLoading(true);
    setError(null);
    try {
      // TODO (M3): replace with real API call
      // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      // const data = await res.json();
      await delay(500); // simulate network latency
      if (email && password) {
        setUser({ ...MOCK_USER, email });
        return true;
      }
      throw new Error("Email and password are required.");
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Simulates creating a new account.
  async function register({ name, email, password }) {
    setLoading(true);
    setError(null);
    try {
      // TODO (M3): replace with real API call
      // const res = await fetch("/api/auth/register", { method: "POST", ... });
      await delay(500);
      if (name && email && password) {
        setUser({ id: Date.now(), name, email });
        return true;
      }
      throw new Error("All fields are required.");
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setError(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// Helper so mock delays look like real network calls.
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
