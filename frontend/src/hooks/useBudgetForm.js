import { useState } from "react";
import { useBudgets } from "../context/BudgetContext";

// ─── useBudgetForm ────────────────────────────────────────────────────────────
// Manages form state and validation for the Add/Edit Budget form.
//
// Usage:
//   const { fields, errors, handleChange, handleSubmit } = useBudgetForm();

const EMPTY_FORM = {
  categoryId: "",
  limit: "",
  period: "monthly",
};

export function useBudgetForm(initialData = null) {
  const { addBudget, editBudget, loading } = useBudgets();
  const [fields, setFields] = useState(initialData ?? EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function handleChange(key) {
    return (e) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: null }));
    };
  }

  function validate() {
    const errs = {};
    if (!fields.categoryId)                     errs.categoryId = "Please select a category.";
    if (!fields.limit || Number(fields.limit) <= 0)
                                                errs.limit      = "Enter a valid budget limit.";
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
      if (initialData?.id) {
        await editBudget(initialData.id, fields);
      } else {
        await addBudget(fields);
      }
      onSuccess?.();
    };
  }

  function resetForm() {
    setFields(initialData ?? EMPTY_FORM);
    setErrors({});
  }

  return { fields, errors, loading, handleChange, handleSubmit, resetForm };
}
