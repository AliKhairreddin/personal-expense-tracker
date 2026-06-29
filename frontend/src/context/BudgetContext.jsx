import { createContext, useContext, useState, useMemo } from "react";
import { MOCK_BUDGETS } from "../data/mockData";
import { useTransactions } from "./TransactionContext";

const BudgetContext = createContext(null);

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useState(MOCK_BUDGETS);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const { transactions } = useTransactions();
  const budgetsWithSpending = useMemo(() => {
    return budgets.map((budget) => {
      const spent = transactions
        .filter((t) => t.type === "expense" && t.categoryId === budget.categoryId)
        .reduce((sum, t) => sum + t.amount, 0);
      const remaining   = budget.limit - spent;
      const percentUsed = Math.min((spent / budget.limit) * 100, 100);
      return { ...budget, spent, remaining, percentUsed };
    });
  }, [budgets, transactions]);

  async function addBudget(formData) {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      const newBudget = { ...formData, id: Date.now(), limit: Number(formData.limit), categoryId: Number(formData.categoryId) };
      setBudgets((prev) => [...prev, newBudget]);
      return newBudget;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function editBudget(id, formData) {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      setBudgets((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...formData, limit: Number(formData.limit) } : b))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBudget(id) {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BudgetContext.Provider value={{ budgets: budgetsWithSpending, loading, error, addBudget, editBudget, deleteBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgets() {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error("useBudgets must be used inside <BudgetProvider>");
  return ctx;
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
