import { createContext, useContext, useState } from "react";
import { MOCK_USER } from "../data/mockData";
//autentication
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  //when not logged in
  const [user, setUser]       = useState(null);   
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  
  async function login({ email, password }) {
    setLoading(true);
    setError(null);
    try {
      await delay(500); 
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
  async function register({ name, email, password }) {
    setLoading(true);
    setError(null);
    try {
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
