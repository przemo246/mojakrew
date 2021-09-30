import { FunctionComponent } from "react";
import reactDom from "react-dom";
import { FaTimes } from "react-icons/fa";
import { Test } from "../../../types/interfaces";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  tests: Test[];
}

export const Modal: FunctionComponent<ModalProps> = ({
  open,
  onClose,
  tests,
}) => {
  if (!open) return null;
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  return reactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal__close">
          <FaTimes className="close-icon" onClick={onClose} />
        </div>
        <div className="modal__content">
          <h2 className="modal__heading">Badania</h2>
          <div className="user-tests">
            {tests.length > 0 ? (
              tests.map((test, i) => (
                <div
                  className="user-tests__item"
                  key={test.id}
                  id={test.id.toString()}
                >
                  <span className="red-label">{i + 1}. </span>
                  <span>
                    Badanie z dnia{" "}
                    {new Date(test.date).toLocaleDateString("en-GB")} w{" "}
                    {test.location}
                  </span>
                  {/* <div className="user-tests__options">
            </div> */}
                </div>
              ))
            ) : (
              <div className="notests-box">
                <span className="red-label">Brak dodanych badań</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
};
