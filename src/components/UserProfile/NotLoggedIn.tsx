import { FunctionComponent, useState } from "react";
import { ButtonRed } from "../atoms/ButtonRed";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../Modal/Modal";

export const NotLoggedIn: FunctionComponent = () => {
  const [isOpen, toggleIsOpen] = useModal();
  const [modalContent, setModalContent] = useState("");

  const handleOnClick = (content: string) => {
    setModalContent(content);
    toggleIsOpen();
  };

  return (
    <>
      <div className="user-profile__buttons">
        <ButtonRed
          type="button"
          disabled={false}
          onClick={() => handleOnClick("login")}
        >
          Logowanie
        </ButtonRed>
        <ButtonRed
          type="button"
          disabled={false}
          onClick={() => handleOnClick("register")}
        >
          Rejestracja
        </ButtonRed>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={toggleIsOpen}
        modalContent={modalContent}
      />
    </>
  );
};
