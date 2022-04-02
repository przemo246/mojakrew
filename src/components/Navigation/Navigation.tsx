import { FunctionComponent } from "react";
import logo from "../../assets/img/logo.png";
import { Modal } from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { Test } from "../../../types/interfaces";
import { MdLibraryAdd, MdAccountCircle, MdList } from "react-icons/md";

interface NavigationProps {
  tests: Test[];
  setCurrentTest: React.Dispatch<React.SetStateAction<Test | null>>;
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
}

export const Navigation: FunctionComponent<NavigationProps> = ({
  tests,
  setCurrentTest,
  setTests,
}) => {
  const [isOpen, toggleIsOpen] = useModal();
  return (
    <>
      <nav className="navigation">
        <div className="logo-container">
          <img src={logo} className="logo" alt="" />
        </div>
        <ul className="navigation__list">
          <li className="navigation__item" onClick={toggleIsOpen}>
            <MdLibraryAdd title="Dodaj badanie" />
          </li>
          <li className="navigation__item">
            <MdList title="Lista badań" />
          </li>
          <li className="navigation__item">
            <MdAccountCircle title="Profil użytkownika" />
          </li>
        </ul>
      </nav>
      <Modal
        open={isOpen}
        onClose={toggleIsOpen}
        tests={tests}
        setCurrentTest={setCurrentTest}
        setTests={setTests}
      />
    </>
  );
};
