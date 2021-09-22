import "./scss/main.scss";
import logo from "./img/logo1x.png";
import { FunctionComponent, useState, useEffect } from "react";
import { UserData } from "./components/UserData/UserData";
import { UserResults } from "./components/UserResults/UserResults";
import { UserAnalysis } from "./components/UserAnalysis/UserAnalysis";
import { Test } from "../types/interfaces";

export const App: FunctionComponent = () => {
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const storedTests: string | null = localStorage.getItem("tests");
    if (storedTests) {
      setTests(JSON.parse(storedTests));
    }
  }, []);

  useEffect(() => {
    if (tests.length > 0) {
      localStorage.setItem("tests", JSON.stringify(tests));
    }
  }, [tests]);

  return (
    <main className="main">
      <nav className="navigation">
        <div className="logo-container">
          <img src={logo} className="logo" alt="" />
        </div>
        <ul className="navigation__list">
          <li className="navigation__item">BADANIA</li>
          <li className="navigation__item">PRZEWODNIK</li>
          <li className="navigation__item">KONTAKT</li>
        </ul>
      </nav>
      <UserData setTests={setTests} setCurrentTest={setCurrentTest} />
      <UserResults
        setTests={setTests}
        currentTest={currentTest}
        setCurrentTest={setCurrentTest}
      />
      <UserAnalysis currentTest={currentTest} />
    </main>
  );
};
