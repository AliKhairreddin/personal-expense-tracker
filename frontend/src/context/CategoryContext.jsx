import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiRequest } from "../utils/api";
import { withCategoryPresentation } from "../utils/categoryPresentation";

const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    setError(null);
    try {
      const result = await apiRequest("/api/categories");
      setCategories(
        (result.data || []).map(withCategoryPresentation)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function getCategoryById(id) {
    return (
      categories.find(
        (category) => category.id === Number(id)
      ) ?? {
        name: "Uncategorized",
        icon: "❓",
        color: "#9ca3af",
      }
    );
  }

  async function addCategory(formData) {
    setLoading(true);
    setError(null);
    try {
      const result = await apiRequest("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const createdCategory = withCategoryPresentation(result.data);
      setCategories((previousCategories) => [
        ...previousCategories,
        createdCategory,
      ]);
      return createdCategory;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function editCategory(id, updatedData) {
    setLoading(true);
    setError(null);
    try {
      const result = await apiRequest(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const updatedCategory = withCategoryPresentation(result.data);
      setCategories((previousCategories) =>
        previousCategories.map((category) =>
          category.id === Number(id)
            ? updatedCategory
            : category
        )
      );
      return updatedCategory;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id) {
    setLoading(true);
    setError(null);
    try {
      await apiRequest(`/api/categories/${id}`, {
        method: "DELETE",
      });
      setCategories((previousCategories) =>
        previousCategories.filter(
          (category) => category.id !== Number(id)
        )
      );
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }
  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        getCategoryById,
        fetchCategories,
        addCategory,
        editCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategories must be used inside <CategoryProvider>"
    );
  }
  return context;
}
