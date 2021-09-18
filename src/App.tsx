import "./scss/main.scss";
import logo from "./img/logo1x.png";
import { FunctionComponent } from "react";
import { UserData } from "./components/UserData";
import { UserResults } from "./components/UserResults";

export const App: FunctionComponent = () => {
  return (
    <div className="container">
      <nav className="navigation">
        <div className="logo-container">
          <img src={logo} className="logo" alt="" />
        </div>
        <ul className="navigation__list"></ul>
        <li className="navigation__item">BADANIA</li>
        <li className="navigation__item">PRZEWODNIK</li>
        <li className="navigation__item">KONTAKT</li>
      </nav>
      <section className="user-data"></section>
      <section className="user-results"></section>
    </div>
  );
};
