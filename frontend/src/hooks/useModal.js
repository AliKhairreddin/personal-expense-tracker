import { useState } from "react";
//opening items and existing too
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
