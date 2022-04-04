import { FunctionComponent } from "react";
import { MdLibraryAdd, MdList } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const Navigation: FunctionComponent = () => {
  return (
    <>
      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink to="/">
              <MdLibraryAdd title="Dodaj badanie" />
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/tests-list">
              <MdList title="Lista badań" />
            </NavLink>
          </li>
          {/* <li className="navigation__item">
            <NavLink to="/user-profile">
              <MdAccountCircle title="Profil użytkownika" />
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </>
  );
};
