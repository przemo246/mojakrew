import { FunctionComponent, useEffect, useState } from "react";
import reactDom from "react-dom";
import {
  FaTimes,
  FaAlignJustify,
  FaEdit,
  FaDownload,
  FaTrash,
} from "react-icons/fa";
import { Test, TestOptions } from "../../../types/interfaces";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  tests: Test[];
  setCurrentTest: React.Dispatch<React.SetStateAction<Test | null>>;
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
}

export const Modal: FunctionComponent<ModalProps> = ({
  open,
  onClose,
  tests,
  setCurrentTest,
  setTests,
}) => {
  const [testOptionsWindow, setTestOptionsWindow] = useState<TestOptions[]>([]);
  useEffect(() => {
    const testOptions = tests.map((test) => ({
      id: test.id,
      isOptionsOpen: false,
    }));
    setTestOptionsWindow(testOptions);
  }, [tests]);

  const findTestOptionsObj = (id: number) => {
    return testOptionsWindow.find((el: TestOptions) => el.id === id);
  };

  const handleSetCurrentTest = (id: number) => {
    const result = tests.find((test) => test.id === id);
    if (result) {
      setCurrentTest(result);
    }
  };

  const handleRemoveTest = (id: number) => {
    setTests((prev) => prev.filter((test) => test.id !== id));
    setCurrentTest((prev) => (prev?.id === id ? null : prev));
  };

  const findIsOptionsOpen = (id: number) => {
    const result = findTestOptionsObj(id);
    if (result) {
      return result.isOptionsOpen;
    }
  };

  const toggleIsOptionsOpen = (id: number) => {
    const result = findTestOptionsObj(id);
    if (result) {
      setTestOptionsWindow((prev) => {
        return prev.map((el) => {
          if (el.id === result.id) {
            return { ...el, isOptionsOpen: !el.isOptionsOpen };
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
                    onClick={() => toggleIsOptionsOpen(test.id)}
                    title="Pokaż opcje"
                  />
                  <div
                    className="user-tests__options"
                    style={
                      findIsOptionsOpen(test.id)
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                  >
                    <div className="user-tests__buttons">
                      <FaEdit
                        className="options-icon"
                        title="Otwórz badanie"
                        onClick={() => handleSetCurrentTest(test.id)}
                      />
                      <FaDownload
                        className="options-icon"
                        title="Pobierz badanie"
                      />
                      <FaTrash
                        className="options-icon"
                        title="Usuń badanie"
                        onClick={() => handleRemoveTest(test.id)}
                      />
                    </div>
                    <FaAlignJustify
                      className="options-icon"
                      onClick={() => toggleIsOptionsOpen(test.id)}
                      title="Pokaż badanie"
                    />
                  </div>
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
