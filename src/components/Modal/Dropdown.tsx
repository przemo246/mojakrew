import { FunctionComponent } from "react";

interface DropdownProps {
  isDropdownOpen: boolean;
}

export const Dropdown: FunctionComponent<DropdownProps> = ({
  isDropdownOpen,
}) => {
  if (!isDropdownOpen) {
    return null;
  }
  return (
    <div className="dropdown">
      <ul className="dropdown__list">
        <li className="dropdown__item">Otwórz badanie</li>
        <li className="dropdown__item">Usuń badanie</li>
        <li className="dropdown__item">Pobierz badanie (.pdf)</li>
      </ul>
    </div>
  );
};
