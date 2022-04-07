import { FunctionComponent } from "react";
import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";
import { Login } from "./Login";
import { Register } from "./Register";

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  modalContent: String;
}

export const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
  modalContent,
}) => {
  if (!isOpen || !modalContent) return null;
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal__close">
          <MdClose className="close-icon" onClick={onClose} />
        </div>
        <div className="modal__content">
          {modalContent === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </>,
    modalRoot
  );
};
