import { useState } from "react";
import { useAuth } from "../context/AuthContext";

// ─── useAuthForm ──────────────────────────────────────────────────────────────
// Drives both the Login and Register forms.
// Pass mode="login" or mode="register".
//
// Usage:
//   const { fields, errors, handleChange, handleSubmit } = useAuthForm("login");

const FORMS = {
  login:    { email: "", password: "" },
  register: { name: "", email: "", password: "", confirmPassword: "" },
};

export function useAuthForm(mode = "login") {
  const { login, register, loading } = useAuth();
  const [fields, setFields] = useState(FORMS[mode]);
  const [errors, setErrors] = useState({});

  function handleChange(key) {
    return (e) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: null }));
    };
  }

  function validate() {
    const errs = {};
    if (mode === "register" && !fields.name?.trim())
      errs.name = "Name is required.";
    if (!fields.email.trim())
      errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(fields.email))
      errs.email = "Enter a valid email address.";
    if (!fields.password)
      errs.password = "Password is required.";
    else if (fields.password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    if (mode === "register" && fields.password !== fields.confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    return errs;
  }

  function handleSubmit(onSuccess) {
    return async (e) => {
      e?.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      const ok = mode === "login"
        ? await login(fields)
        : await register(fields);
      if (ok) onSuccess?.();
    };
  }

  return { fields, errors, loading, handleChange, handleSubmit };
}
