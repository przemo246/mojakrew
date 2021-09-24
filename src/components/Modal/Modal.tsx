import { FunctionComponent } from "react";
import reactDom from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export const Modal: FunctionComponent<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return reactDom.createPortal(
    <>
      <div></div>
    </>,
    modalRoot
  );
};
