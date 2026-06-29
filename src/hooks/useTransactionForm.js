import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

// ─── useTransactionForm ───────────────────────────────────────────────────────
// Manages all state and validation for the Add/Edit Transaction form.
// Pass an existing transaction to `initialData` when editing; omit it (or pass
// null) when creating a new one.
//
// Usage in your form component:
//   const { fields, errors, handleChange, handleSubmit, resetForm } = useTransactionForm();
//
// Then bind to your inputs:
//   <input value={fields.description} onChange={handleChange("description")} />
//   {errors.description && <p>{errors.description}</p>}
//   <button onClick={handleSubmit(onSuccess)}>Save</button>

const EMPTY_FORM = {
  type: "expense",
  amount: "",
  description: "",
  categoryId: "",
  date: new Date().toISOString().split("T")[0], // today's date as default
};

export function useTransactionForm(initialData = null) {
  const { addTransaction, editTransaction, loading } = useTransactions();
  const [fields, setFields] = useState(initialData ?? EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function handleChange(key) {
    return (e) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      // Clear the error for this field as the user types.
      setErrors((prev) => ({ ...prev, [key]: null }));
    };
  }

  function validate() {
    const errs = {};
    if (!fields.description.trim())        errs.description = "Description is required.";
    if (!fields.amount || Number(fields.amount) <= 0)
                                           errs.amount      = "Enter a valid amount greater than 0.";
    if (!fields.categoryId)                errs.categoryId  = "Please select a category.";
    if (!fields.date)                      errs.date        = "Date is required.";
    return errs;
  }

  // handleSubmit returns a function you call with an optional onSuccess callback.
  // onSuccess receives the saved transaction so your component can close the modal.
  function handleSubmit(onSuccess) {
    return async (e) => {
      e?.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      let result;
      if (initialData?.id) {
        await editTransaction(initialData.id, fields);
        result = { ...initialData, ...fields };
      } else {
        result = await addTransaction(fields);
      }
      onSuccess?.(result);
    };
  }

  function resetForm() {
    setFields(initialData ?? EMPTY_FORM);
    setErrors({});
  }

  return { fields, errors, loading, handleChange, handleSubmit, resetForm };
}
