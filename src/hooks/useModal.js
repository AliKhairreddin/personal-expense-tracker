import { useState } from "react";

// ─── useModal ─────────────────────────────────────────────────────────────────
// Generic open/close state for any modal dialog.
// `data` carries the item being edited; it's null when opening for a new item.
//
// Usage:
//   const modal = useModal();
//
//   // Open to add a new item:
//   <button onClick={modal.open}>Add Transaction</button>
//
//   // Open to edit an existing item:
//   <button onClick={() => modal.open(transaction)}>Edit</button>
//
//   // Inside the modal component:
//   {modal.isOpen && (
//     <TransactionModal initialData={modal.data} onClose={modal.close} />
//   )}

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData]     = useState(null);

  function open(itemData = null) {
    setData(itemData);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setData(null);
  }

  return { isOpen, data, open, close };
}
