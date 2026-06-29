import { createContext, useContext, useState } from "react";
import { DEFAULT_CATEGORIES } from "../data/mockData";
const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  
  function getCategoryById(id) {
    return categories.find((c) => c.id === Number(id)) ?? { name: "Uncategorized", icon: "❓", color: "#9ca3af" };
  }

  async function addCategory(formData) {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      const newCat = { ...formData, id: Date.now(), isCustom: true };
      setCategories((prev) => [...prev, newCat]);
      return newCat;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function editCategory(id, formData) {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...formData } : c))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id) {
    setLoading(true);
    setError(null);
    try {
      await delay(300);
      setCategories((prev) => prev.filter((c) => c.id !== id || !c.isCustom));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CategoryContext.Provider
      value={{ categories, loading, error, getCategoryById, addCategory, editCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCategories must be used inside <CategoryProvider>");
  return ctx;
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
