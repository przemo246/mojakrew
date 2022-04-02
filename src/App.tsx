import "./scss/main.scss";
import { FunctionComponent, useState, useEffect } from "react";
import { UserData } from "./components/UserData/UserData";
import { UserResults } from "./components/UserResults/UserResults";
import { UserAnalysis } from "./components/UserAnalysis/UserAnalysis";
import { Test } from "../types/interfaces";
import { Navigation } from "./components/Navigation/Navigation";

export const App: FunctionComponent = () => {
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const storedTests = localStorage.getItem("tests");
    if (storedTests) {
      setTests(JSON.parse(storedTests));
    }
  }, []);

  useEffect(() => {
    if (tests.length > 0) {
      localStorage.setItem("tests", JSON.stringify(tests));
    } else {
      localStorage.clear();
    }
  }, [tests]);

  return (
    <main className="main">
      <Navigation
        tests={tests}
        setCurrentTest={setCurrentTest}
        setTests={setTests}
      />
      <section className="content">
        <UserData
          setTests={setTests}
          setCurrentTest={setCurrentTest}
          currentTest={currentTest}
        />
        <UserResults
          setTests={setTests}
          currentTest={currentTest}
          setCurrentTest={setCurrentTest}
        />
        <UserAnalysis
          currentTest={currentTest}
          setTests={setTests}
          setCurrentTest={setCurrentTest}
        />
      </section>
    </main>
  );
};
