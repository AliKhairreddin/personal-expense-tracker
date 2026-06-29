import { createContext, useContext, useState, useMemo } from "react";
import { MOCK_TRANSACTIONS } from "../data/mockData";

// ─── TransactionContext ───────────────────────────────────────────────────────
// Manages the full list of transactions plus any active filters.
// All CRUD operations live here so every screen stays in sync automatically.
//
// Milestone 3: replace each mock operation with the matching backend call:
//   listTransactions  → GET  /api/transactions
//   createTransaction → POST /api/transactions
//   updateTransaction → PUT  /api/transactions/:id
//   deleteTransaction → DELETE /api/transactions/:id

const TransactionContext = createContext(null);

const EMPTY_FILTERS = { type: "all", categoryId: "all", dateFrom: "", dateTo: "", search: "" };

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [filters, setFilters]           = useState(EMPTY_FILTERS);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState(null);

  // ── Derived: filtered list ────────────────────────────────────────────────
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filters.type !== "all" && t.type !== filters.type) return false;
      if (filters.categoryId !== "all" && t.categoryId !== Number(filters.categoryId)) return false;
      if (filters.dateFrom && t.date < filters.dateFrom) return false;
      if (filters.dateTo   && t.date > filters.dateTo)   return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!t.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [transactions, filters]);

  // ── Derived: totals used by the Dashboard ────────────────────────────────
  const summary = useMemo(() => {
    const totalIncome  = transactions.filter(t => t.type === "income") .reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
  }, [transactions]);

  // ── CRUD ──────────────────────────────────────────────────────────────────
  async function addTransaction(formData) {
    setLoading(true);
    setError(null);
    try {
      // TODO (M3): const res = await fetch("/api/transactions", { method: "POST", body: JSON.stringify(formData) });
      await delay(300);
      const newTx = { ...formData, id: Date.now(), amount: Number(formData.amount) };
      setTransactions((prev) => [newTx, ...prev]);
      return newTx;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function editTransaction(id, formData) {
    setLoading(true);
    setError(null);
    try {
      // TODO (M3): await fetch(`/api/transactions/${id}`, { method: "PUT", body: JSON.stringify(formData) });
      await delay(300);
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...formData, amount: Number(formData.amount) } : t))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTransaction(id) {
    setLoading(true);
    setError(null);
    try {
      // TODO (M3): await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      await delay(300);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS);
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        filteredTransactions,
        filters,
        summary,
        loading,
        error,
        addTransaction,
        editTransaction,
        deleteTransaction,
        updateFilter,
        clearFilters,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used inside <TransactionProvider>");
  return ctx;
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
