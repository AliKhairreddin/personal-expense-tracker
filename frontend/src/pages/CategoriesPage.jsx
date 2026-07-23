import { useState } from "react";
import { useCategories } from "../context/CategoryContext";
import "../categories.css";

function CategoriesPage() {
  const {
    categories,
    addCategory,
    editCategory,
    deleteCategory,
    loading,
    error,
  } = useCategories();
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("expense");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("expense");

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = categoryName.trim();
    if (trimmedName === "") {
      setFormError("Category name is required.");
      setSuccessMessage("");
      return;
    }
    const duplicateExists = categories.some(
      (category) =>
        category.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicateExists) {
      setFormError("A category with this name already exists.");
      setSuccessMessage("");
      return;
    }
    const newCategory = {
      name: trimmedName,
      type: categoryType,
    };
    const createdCategory = await addCategory(newCategory);
    if (createdCategory) {
      setCategoryName("");
      setCategoryType("expense");
      setFormError("");
      setSuccessMessage("Category added successfully.");
    }
  }

  function startEditing(category) {
    setEditingId(category.id);
    setEditName(category.name);
    setEditType(category.type);
    setFormError("");
    setSuccessMessage("");
  }

  function cancelEditing() {
    setEditingId(null);
    setEditName("");
    setEditType("expense");
  }

  async function handleUpdate(id) {
    const trimmedName = editName.trim();
    if (trimmedName === "") {
      setFormError("Category name is required.");
      setSuccessMessage("");
      return;
    }
    const duplicateExists = categories.some(
      (category) =>
        category.id !== id &&
        category.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicateExists) {
      setFormError("A category with this name already exists.");
      setSuccessMessage("");
      return;
    }
    const updatedCategory = {
      name: trimmedName,
      type: editType,
    };
    const result = await editCategory(id, updatedCategory);
    if (result) {
      setEditingId(null);
      setEditName("");
      setEditType("expense");
      setFormError("");
      setSuccessMessage("Category updated successfully.");
    }
  }

  async function handleDelete(id) {
    const deleted = await deleteCategory(id);
    if (deleted) {
      if (editingId === id) {
        cancelEditing();
      }
      setFormError("");
      setSuccessMessage("Category deleted successfully.");
    }
  }

  return (
    <section className="categories-page">
      <h2>Categories</h2>

      <p>
        Create categories to organize your income and expenses.
      </p>
      <form onSubmit={handleSubmit} className="category-form">
        <div>
          <label htmlFor="category-name">
            Category name
          </label>
          <input
            id="category-name"
            type="text"
            value={categoryName}
            onChange={(event) => {
              setCategoryName(event.target.value);
              setFormError("");
              setSuccessMessage("");
            }}
            placeholder="Example: Groceries"
          />
        </div>
        <div>
          <label htmlFor="category-type">
            Category type
          </label>
          <select
            id="category-type"
            value={categoryType}
            onChange={(event) => {
              setCategoryType(event.target.value);
              setFormError("");
              setSuccessMessage("");
            }}
          >
            <option value="expense">
              Expense
            </option>
            <option value="income">
              Income
            </option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
      {formError && (
        <p className="error-message">
          {formError}
        </p>
      )}
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
      {successMessage && (
        <p className="success-message">
          {successMessage}
        </p>
      )}
      <div className="category-list">
        <h3>Your Categories</h3>
        {categories.length === 0 ? (
          <p>
            No categories have been created yet.
          </p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                {editingId === category.id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(event) => {
                        setEditName(event.target.value);
                        setFormError("");
                        setSuccessMessage("");
                      }}
                    />
                    <select
                      value={editType}
                      onChange={(event) => {
                        setEditType(event.target.value);
                        setFormError("");
                        setSuccessMessage("");
                      }}
                    >
                      <option value="expense">
                        Expense
                      </option>
                      <option value="income">
                        Income
                      </option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleUpdate(category.id)}
                      disabled={loading}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <strong>
                        {category.name}
                      </strong>
                      <p>
                        {category.type === "income"
                          ? "Income"
                          : "Expense"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => startEditing(category)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(category.id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
export default CategoriesPage;
