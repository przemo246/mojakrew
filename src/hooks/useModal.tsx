import { useState } from "react";

export const useModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  return [isOpen, toggleIsOpen];
};
