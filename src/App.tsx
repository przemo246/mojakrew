import "./scss/main.scss";
import logo from "./img/logo1x.png";
import { FunctionComponent, useState, useEffect } from "react";
import { UserData } from "./components/UserData/UserData";
import { UserResults } from "./components/UserResults/UserResults";
import { UserAnalysis } from "./components/UserAnalysis/UserAnalysis";
import { Test } from "../types/interfaces";

export const App: FunctionComponent = () => {
  const [currentTest, setCurrentTest] = useState<number | null>(null);
  const [tests, setTests] = useState<Test[]>([]);

  return (
    <main className="main">
      <nav className="navigation">
        <div className="logo-container">
          <img src={logo} className="logo" alt="" />
        </div>
        <ul className="navigation__list"></ul>
        <li className="navigation__item">BADANIA</li>
        <li className="navigation__item">PRZEWODNIK</li>
        <li className="navigation__item">KONTAKT</li>
      </nav>
      <UserData setTests={setTests} setCurrentTest={setCurrentTest} />
      <UserResults currentTest={currentTest} />
      <UserAnalysis />
    </main>
  );
};
