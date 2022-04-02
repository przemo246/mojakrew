import { FunctionComponent } from "react";
import logo from "../../assets/img/logo1x.png";
import { Modal } from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { Test } from "../../../types/interfaces";

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
            BADANIA
          </li>
          <li className="navigation__item">
            <a
              href="https://github.com/Przemo246/mojakrew"
              rel="noreferrer"
              target="_blank"
              className="navigation__link"
            >
              GITHUB
            </a>
          </li>
          <li className="navigation__item">
            <a className="navigation__link" href="mailto:przemo247@outlook.com">
              EMAIL
            </a>
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
