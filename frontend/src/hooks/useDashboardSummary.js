import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import {
  EMPTY_DASHBOARD_SUMMARY,
  normalizeDashboardSummary,
} from "../utils/dashboardApi";

export function useDashboardSummary(userId) {
  const [summary, setSummary] = useState(EMPTY_DASHBOARD_SUMMARY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSummary() {
      setLoading(true);
      setError(null);

      try {
        const query = userId ? `?userId=${encodeURIComponent(userId)}` : "";
        const result = await apiRequest(`/api/dashboard/summary${query}`, {
          signal: controller.signal,
        });

        setSummary(normalizeDashboardSummary(result.data));
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadSummary();

    return () => controller.abort();
  }, [requestVersion, userId]);

  function reload() {
    setRequestVersion((version) => version + 1);
  }

  return {
    summary,
    loading,
    error,
    reload,
  };
}
