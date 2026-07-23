const configuredBaseUrl = import.meta.env?.VITE_API_URL || "http://localhost:3000";

export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, "");

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "The request could not be completed.");
  }

  return payload;
}
