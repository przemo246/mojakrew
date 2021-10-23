import { FunctionComponent, useEffect, useState } from "react";
import reactDom from "react-dom";
import { FaTimes, FaAlignJustify } from "react-icons/fa";
import { Test, Settings } from "../../../types/interfaces";

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
  const [testSettingsWindow, setTestSettingsWindow] = useState<Settings[]>([]);
  useEffect(() => {
    const testSettings = tests.map((test) => ({
      id: test.id,
      isSettingsOpen: false,
    }));
    setTestSettingsWindow(testSettings);
  }, [tests]);

  const findTestSettings = (id: number) => {
    return testSettingsWindow.find((el: Settings) => el.id === id);
  };

  const findIsSettingsOpen = (id: number) => {
    const result = findTestSettings(id);
    if (result) {
      return result.isSettingsOpen;
    }
  };

  const toggleIsSettingsOpen = (id: number) => {
    const result = findTestSettings(id);
    if (result) {
      setTestSettingsWindow((prev) => {
        return prev.map((el) => {
          if (el.id === result.id) {
            return { ...el, isSettingsOpen: !el.isSettingsOpen };
          }
          return el;
        });
      });
    }
  };
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
                  <div className="user-tests__description">
                    <span className="red-label">{i + 1}. </span>
                    <span>
                      Badanie z dnia{" "}
                      {new Date(test.date).toLocaleDateString("en-GB")} w{" "}
                      {test.location}
                    </span>
                  </div>
                  <FaAlignJustify
                    className="options-icon"
                    onClick={() => toggleIsSettingsOpen(test.id)}
                  />
                  <div
                    className="user-tests__options"
                    style={
                      findIsSettingsOpen(test.id)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  ></div>
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
