import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

//manages validation 
const EMPTY_FORM = {
  type: "expense",
  amount: "",
  description: "",
  categoryId: "",
  date: new Date().toISOString().split("T")[0], 
};

export function useTransactionForm(initialData = null) {
  const { addTransaction, editTransaction, loading } = useTransactions();
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
    if (!fields.description.trim())        errs.description = "Description is required.";
    if (!fields.amount || Number(fields.amount) <= 0)
                                           errs.amount      = "Enter a valid amount greater than 0.";
    if (!fields.categoryId)                errs.categoryId  = "Please select a category.";
    if (!fields.date)                      errs.date        = "Date is required.";
    return errs;
  }
  //saves transaction
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
