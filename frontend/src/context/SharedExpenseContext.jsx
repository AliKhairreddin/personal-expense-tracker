import { createContext, useContext, useState } from "react";
import { MOCK_SHARED_EXPENSES } from "../data/mockData";

const SharedExpenseContext = createContext(null);

export function SharedExpenseProvider({ children }) {
  const [sharedExpenses, setSharedExpenses] = useState(MOCK_SHARED_EXPENSES);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  
  async function addSharedExpense(formData) {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      const newExpense = { ...formData, id: Date.now(), members: [], totalAmount: Number(formData.totalAmount) };
      setSharedExpenses((prev) => [newExpense, ...prev]);
      return newExpense;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function editSharedExpense(id, formData) {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      setSharedExpenses((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...formData, totalAmount: Number(formData.totalAmount) } : e))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteSharedExpense(id) {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      setSharedExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  async function addMember(expenseId, memberData) {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      const newMember = { ...memberData, id: Date.now(), share: Number(memberData.share), paid: false };
      setSharedExpenses((prev) =>
        prev.map((e) =>
          e.id === expenseId ? { ...e, members: [...e.members, newMember] } : e
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleMemberPaid(expenseId, memberId) {
    setLoading(true);
    setError(null);
    try {
      await delay(200);
      setSharedExpenses((prev) =>
        prev.map((e) =>
          e.id === expenseId
            ? {
                ...e,
                members: e.members.map((m) =>
                  m.id === memberId ? { ...m, paid: !m.paid } : m
                ),
              }
            : e
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function removeMember(expenseId, memberId) {
    setLoading(true);
    setError(null);
    try {
      await delay(200);
      setSharedExpenses((prev) =>
        prev.map((e) =>
          e.id === expenseId
            ? { ...e, members: e.members.filter((m) => m.id !== memberId) }
            : e
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SharedExpenseContext.Provider
      value={{
        sharedExpenses,
        loading,
        error,
        addSharedExpense,
        editSharedExpense,
        deleteSharedExpense,
        addMember,
        toggleMemberPaid,
        removeMember,
      }}
    >
      {children}
    </SharedExpenseContext.Provider>
  );
}

export function useSharedExpenses() {
  const ctx = useContext(SharedExpenseContext);
  if (!ctx) throw new Error("useSharedExpenses must be used inside <SharedExpenseProvider>");
  return ctx;
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
